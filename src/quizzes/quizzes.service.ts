import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Quizzes } from './schemas/created.quizzes.schema';
import { DeployedQuizzes } from './schemas/deployed.quizzes.schema';

import { Query } from 'express-serve-static-core'
import { BadRequestException } from '@nestjs/common/exceptions';
import { User } from '../auth/schemas/user.schema';
import { generateQuizCode } from '../utils/functions/quiz-code-generator.utils'

import { getQuizzesWithOutCorrectAnswer, getQuizWithOutCorrectAnswer, initialTakeQuizAnswer, getTakeQuizWithOutAnswer } from 'src/utils/functions/quiz-remove-correct-answer.utils';
import { RunningQuizzes } from './schemas/running.quizzes.schema';
import { ADD_MINUTES_DIFF_DEPLOY, ADD_MINUTES_DIFF_TAKE_QUIZ } from 'src/config/constraints';
import { getDateWithDuration, isExpired } from 'src/utils/functions/date.utils';
import { Response } from 'express';

@Injectable()
export class QuizzesService {
    constructor(
        @InjectModel(Quizzes.name)
        private quizzesModel: Model<Quizzes>,
        @InjectModel(DeployedQuizzes.name)
        private deployedQuizzesModel: Model<DeployedQuizzes>,
        @InjectModel(RunningQuizzes.name)
        private runningQuizzesModel: Model<RunningQuizzes>
    ) { }

    // get all quizzes
    async getAll(query: Query, userId: string): Promise<Quizzes[]> {
        const keyword = query.name ? {
            name: {
                $regex: query.name,
                $options: 'i'
            }
        } : {}

        if (query.owned) {
            const quizzes = await this.quizzesModel.find({
                user: userId,
            }).populate('user', 'fullname')
            return quizzes
        }

        const quizzes = await this.quizzesModel.find({ ...keyword }).populate('user', 'fullname')


        return quizzes
    }

    // get edit one quiz ( By Id )
    async getEditQuiz(id: string, userId: string): Promise<Quizzes> {
        if (!mongoose.isValidObjectId(id)) throw new BadRequestException('Quiz not found!')

        // get quiz for edit
        const quiz = await this.quizzesModel.findOne({
            _id: id,
            user: userId
        }).populate('user', 'fullname')
        if (!quiz) {
            throw new NotFoundException('Quiz not found or not owned.')
        }
        return quiz

    }

    // get all deployed quizzes
    async getAllDeployed(query: Query): Promise<DeployedQuizzes[] | DeployedQuizzes> {
        const { codeJoin, quizId } = query
        if (codeJoin || quizId) {
            return this.getDeployed(query)
        }

        const currentTimestamp = new Date();
        const quizzes = await this.deployedQuizzesModel
            .find({ expiredAt: { $gte: currentTimestamp } })
            .populate('user', 'fullname')
            .exec();

        const finalQuizzes = getQuizzesWithOutCorrectAnswer(quizzes)

        return finalQuizzes
    }

    // get deployed quiz ( By Code Join or Id )
    async getDeployed(query: Query): Promise<DeployedQuizzes> {
        const { codeJoin, quizId } = query

        const currentTimestamp = new Date();
        // get by code join
        if (codeJoin) {
            const deployedQuiz = await this.deployedQuizzesModel.findOne({
                codeJoin: codeJoin,
                expiredAt: { $gte: currentTimestamp }
            }).populate('user', 'fullname')
            if (!deployedQuiz) {
                throw new NotFoundException('Quiz not open for join or expired.')
            }
            const finalQuiz = getQuizWithOutCorrectAnswer(deployedQuiz)
            return finalQuiz
        }

        if (quizId) {
            const deployedQuiz = await this.deployedQuizzesModel.findOne({
                _id: quizId,
                expiredAt: { $gte: currentTimestamp }
            }).populate('user', 'fullname')
            if (!deployedQuiz) {
                throw new NotFoundException('Quiz not open for join or expired.')
            }
            const finalQuiz = getQuizWithOutCorrectAnswer(deployedQuiz)
            return finalQuiz
        }
    }

    async updateAnswer(userId: string, body: any, res: Response) {
        const { quizId, answers } = body
        if (!quizId || !answers) return res.status(HttpStatus.OK).json({ message: 'bad reqeust null' })

        if (!mongoose.isValidObjectId(quizId)) return res.status(HttpStatus.OK).json({ message: 'bad reqeust quizId' })
        if (!mongoose.isValidObjectId(userId)) return res.status(HttpStatus.OK).json({ message: 'bad reqeust userId' })


        const runningQuiz = await this.runningQuizzesModel.findOneAndUpdate(
            { user: userId, copyof: quizId },
            { answers: answers }
        ).populate('copyof', 'expiredAt');

        if (runningQuiz) {
            if (isExpired(runningQuiz.copyof.expiredAt)) {
                return res.status(HttpStatus.OK).json({ message: 'Time\'s up!, we going to redirect you to the result page.' })
            }

            // Perform the update operation here
            runningQuiz.answers = answers; // Assuming updatedAnswers contains the updated answers
            await runningQuiz.save();
            const finalQuiz = getTakeQuizWithOutAnswer(runningQuiz)

            return res.status(200).json({ quiz: finalQuiz });
        }

        return res.status(200).json({message: 'not found quiz'})
    }

    async takeQuiz(userId: string, res: Response, query: Query) {
        const { quizId } = query
        if (!quizId) {
            throw new BadRequestException('What you doing? this is not a quiz.')
        }

        if (!mongoose.isValidObjectId(quizId)) throw new BadRequestException('What you doing? this is not a quiz.')
        if (!mongoose.isValidObjectId(userId)) throw new BadRequestException('Server error can\'t find user.')

        const runninQuiz = await this.runningQuizzesModel.findOne({
            user: userId,
            copyof: quizId
        }).populate('copyof', 'name expiredAt')

        if (runninQuiz) {
            if (isExpired(runninQuiz.copyof.expiredAt)) {
                throw new BadRequestException('Time\'s up!, we going to redirect you to the result page.')
            }

            const finalQuiz = getTakeQuizWithOutAnswer(runninQuiz)

            res.status(HttpStatus.OK)
            return res.send({
                message: 'You still have a running quiz. we going to redirect you to the quiz.',
                runninQuiz: finalQuiz
            })
        }

        const currentTimestamp = new Date();
        const deployedQuiz = await this.deployedQuizzesModel.findOne({
            _id: quizId, expiredAt: {
                $gte: currentTimestamp
            }
        }).populate('user', '_id')

        if (!deployedQuiz) {
            throw new NotFoundException('Quiz not found or expired.')
        }

        currentTimestamp.setMinutes(currentTimestamp.getMinutes() + ADD_MINUTES_DIFF_TAKE_QUIZ);
        const data = {
            questions: deployedQuiz.questions,
            answers: []
        }
        const initialAnswerData = initialTakeQuizAnswer(data)
        Object.assign(initialAnswerData, { copyof: deployedQuiz._id })
        Object.assign(initialAnswerData, { user: userId })

        const takeQuiz = await this.runningQuizzesModel.create(initialAnswerData)
        await takeQuiz.populate('copyof', 'name expiredAt')
        const finalQuiz = getTakeQuizWithOutAnswer(takeQuiz)
        res.status(HttpStatus.OK)
        return res.send(finalQuiz)
    }


    // deploy quiz ( By Id )
    async deploy(id: string, userId: string): Promise<DeployedQuizzes> {
        if (!mongoose.isValidObjectId(id)) throw new BadRequestException('Quiz not found!')

        const quiz = await this.quizzesModel.findOne({
            _id: id,
            user: userId
        })
        if (!quiz) {
            throw new NotFoundException('Quiz not found or not owned.')
        }

        const expiredAt = getDateWithDuration(quiz.duration, ADD_MINUTES_DIFF_DEPLOY)
        const deployedQuiz = {
            name: quiz.name,
            description: quiz.description,
            imageUrl: quiz.imageUrl,
            points: quiz.points,
            duration: quiz.duration,
            user: quiz.user,
            hideCorrectAnswer: quiz.hideCorrectAnswer,
            questions: quiz.questions,
            codeJoin: null,
            expiredAt: expiredAt
        }

        do {
            deployedQuiz.codeJoin = generateQuizCode(6);
        } while (await this.deployedQuizzesModel.findOne({ codeJoin: deployedQuiz.codeJoin }))

        const newDeployedQuiz = await this.deployedQuizzesModel.create(deployedQuiz)

        return newDeployedQuiz
    }


    // create quiz
    async create(newQuiz: Quizzes, user: User): Promise<Quizzes> {


        const data = Object.assign(newQuiz, { user: user._id })

        const quiz = await this.quizzesModel.create(data)
        await quiz.populate('user', 'fullname')
        return quiz
    }


    // delete quiz ( By Id )
    async deleteByUser(id: string, userId: string, res: Response): Promise<Response> {


        if (!mongoose.isValidObjectId(id)) throw new BadRequestException('Incorrect id.')

        const deleted = await this.quizzesModel.findOneAndDelete({
            _id: id,
            user: userId
        })

        if (!deleted) {
            throw new NotFoundException('Quiz not found or not owned.')
        }

        return res.status(HttpStatus.OK).json({ message: 'Quiz deleted.'})
    }

    // update quiz ( By Id )
    async updateByUser(id: string, updateQuiz: Quizzes, userId: string): Promise<Quizzes> {
        if (!mongoose.isValidObjectId(id)) throw new BadRequestException('Incorrect id.')

        const updateQuizFinal = { ...updateQuiz, codeJoin: undefined }

        return await this.quizzesModel.findOneAndUpdate({
            _id: id,
            user: userId
        }, updateQuizFinal, {
            new: true,
            runValidators: true
        })

        // return await this.quizzesModel.findByIdAndUpdate(id, updateQuiz, {
        //     new: true,
        //     runValidators: true
        // })
    }

}
