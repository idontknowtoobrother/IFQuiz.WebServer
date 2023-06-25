import { HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Quizzes } from './schemas/created.quizzes.schema';
import { DeployedQuizzes } from './schemas/deployed.quizzes.schema';

import { Query } from 'express-serve-static-core'
import { BadRequestException } from '@nestjs/common/exceptions';
import { User } from '../auth/schemas/user.schema';
import { generateQuizCode } from '../utils/functions/quiz-code-generator.utils'

import { getQuizzesWithOutCorrectAnswer, getQuizWithOutCorrectAnswer, initialTakeQuizAnswer, getTakeQuizWithOutAnswer, getRunningQuizzesWithOutCorrectAnswer, getCompletedQuizzesWithOutCorrectAnswer } from 'src/utils/functions/quiz-remove-correct-answer.utils';
import { RunningQuizzes } from './schemas/running.quizzes.schema';
import { getDateWithDuration, isExpired } from 'src/utils/functions/date.utils';
import { Response } from 'express';
import { checkQuizCompleted, checkQuizzesCompleted } from 'src/utils/functions/initial.completed.quiz.utils';
import { CompletedQuizzes } from './schemas/completed.quizzes.schema';

@Injectable()
export class QuizzesService {
    constructor(
        @InjectModel(Quizzes.name)
        private quizzesModel: Model<Quizzes>,
        @InjectModel(DeployedQuizzes.name)
        private deployedQuizzesModel: Model<DeployedQuizzes>,
        @InjectModel(RunningQuizzes.name)
        private runningQuizzesModel: Model<RunningQuizzes>,
        @InjectModel(CompletedQuizzes.name)
        private completedQuizzesModel: Model<CompletedQuizzes>
    ) { }

    private readonly logger = new Logger(QuizzesService.name) // logger

    
    // get all quizzes
    async getAll(query: Query, userId: string): Promise<Quizzes[]> {
        this.logger.log(`get all quizzes: userId[${userId}] query[${JSON.stringify(query)}]`)
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
            this.logger.log(`get all quizzes: userId[${userId}] query[${JSON.stringify(query)}] response[${JSON.stringify(quizzes)}]`)
            return quizzes
        }

        const quizzes = await this.quizzesModel.find({ ...keyword }).populate('user', 'fullname')

        this.logger.log(`get all quizzes: userId[${userId}] query[${JSON.stringify(query)}] response[${JSON.stringify(quizzes)}]`)
        return quizzes
    }

    // get edit one quiz ( By Id )
    async getEditQuiz(id: string, userId: string): Promise<Quizzes> {
        this.logger.log(`get edit quiz: userId[${userId}] id[${id}]`)
        if (!mongoose.isValidObjectId(id)) {
            this.logger.error(`get edit quiz: userId[${userId}] id[${id}] response[Bad Request]`)
            throw new BadRequestException('Quiz not found!')
        }

        // get quiz for edit
        const quiz = await this.quizzesModel.findOne({
            _id: id,
            user: userId
        }).populate('user', 'fullname')
        if (!quiz) {
            this.logger.error(`get edit quiz: userId[${userId}] id[${id}] response[Not Found]`)
            throw new NotFoundException('Quiz not found or not owned.')
        }

        this.logger.log(`get edit quiz: userId[${userId}] id[${id}] response[${JSON.stringify(quiz)}]`)
        return quiz

    }

    // get all deployed quizzes
    async getAllDeployed(query: Query): Promise<DeployedQuizzes[] | DeployedQuizzes> {
        this.logger.log(`get all deployed quizzes: query[${JSON.stringify(query)}]`)
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

        this.logger.log(`get all deployed quizzes: query[${JSON.stringify(query)}] response[${JSON.stringify(finalQuizzes)}]`)
        return finalQuizzes
    }


    async submitQuiz(userId: string, quizId: string, res: Response): Promise<CompletedQuizzes | Response>{
        this.logger.log(`submit quiz: userId[${userId}] quizId[${quizId}]`)
        if (!mongoose.isValidObjectId(userId)) {
            this.logger.error(`submit quiz: userId[${userId}] quizId[${quizId}] response[Bad Request]`)
            throw new BadRequestException('Server can\'t get userId')
        }
        if (!mongoose.isValidObjectId(quizId)) {
            this.logger.error(`submit quiz: userId[${userId}] quizId[${quizId}] response[Bad Request]`)
            throw new BadRequestException('Server can\'t get userId')
        }

        const currentTimestamp = new Date();
        const runningQuiz = await this.runningQuizzesModel.findOne({
            user: userId,
            expiredAt: { $lte: currentTimestamp }
        }).populate('copyof').populate('user')

        if(!runningQuiz){
            this.logger.error(`submit quiz: userId[${userId}] quizId[${quizId}] response[Not Found]`)
            throw new NotFoundException('Quiz not found')
        }
        const checkedQuiz = checkQuizCompleted(runningQuiz);
        await this.runningQuizzesModel.deleteOne({ _id: runningQuiz._id });

        const completedQuiz = await this.completedQuizzesModel.create(checkedQuiz);

        await completedQuiz.populate('copyof')
        await completedQuiz.populate({
            path: 'copyof',
            populate: {
                path: 'user'
            }
        })
        this.logger.log(`submit quiz: userId[${userId}] quizId[${quizId}] response[${JSON.stringify(completedQuiz)}]`)
        return completedQuiz
    }


    async getCompletedQuiz(userId:string, quizId: string){
        this.logger.log(`get completed quiz: userId[${userId}] quizId[${quizId}]`)
        const completedQuiz = await this.completedQuizzesModel.find({ user: userId, _id: quizId }).populate('copyof').populate({
            path: 'copyof',
            populate: {
                path: 'user'
            }
        }) as any
        
        const finalQuiz = getCompletedQuizzesWithOutCorrectAnswer(completedQuiz)
        this.logger.log(`get completed quiz: userId[${userId}] quizId[${quizId}] response[${JSON.stringify(finalQuiz)}]`)
        return finalQuiz
    }

    async getCompletedQuizzes(userId: string, query: Query){
        this.logger.log(`get completed quizzes: userId[${userId}] query[${JSON.stringify(query)}]`)
        if (!mongoose.isValidObjectId(userId)) {
            this.logger.error(`get completed quizzes: userId[${userId}] query[${JSON.stringify(query)}] response[Bad Request]`)
            throw new BadRequestException('Server can\'t get userId')
        }
        const { quizId } = query

        if(quizId)return this.getCompletedQuiz(userId, quizId as string)

        const currentTimestamp = new Date();
        const runningQuizzes = await this.runningQuizzesModel.find({
            user: userId,
            expiredAt: { $lt: currentTimestamp }
        }).populate('copyof').populate('user')

        if (runningQuizzes.length > 0) {
            const checkedRunningQuizzes = checkQuizzesCompleted(runningQuizzes);
            await this.completedQuizzesModel.insertMany(checkedRunningQuizzes);
            
            // // Extract the IDs of the runningQuizzes to be deleted
            const runningQuizIds = runningQuizzes.map((quiz) => quiz._id);
            // // Delete the runningQuizzes documents
            await this.runningQuizzesModel.deleteMany({ _id: { $in: runningQuizIds } });
        }


        const completedQuizzes = await this.completedQuizzesModel.find({ user: userId }).populate('copyof').populate({
            path: 'copyof',
            populate: {
                path: 'user'
            }
        })
        const finalQuiz = getCompletedQuizzesWithOutCorrectAnswer(completedQuizzes)
        this.logger.log(`get completed quizzes: userId[${userId}] query[${JSON.stringify(query)}] response[${JSON.stringify(finalQuiz)}]`)
        return finalQuiz
    }

    // get deployed quiz ( By Code Join or Id )
    async getDeployed(query: Query): Promise<DeployedQuizzes> {
        this.logger.log(`get deployed quiz: query[${JSON.stringify(query)}]`)
        const { codeJoin, quizId } = query

        const currentTimestamp = new Date();
        // get by code join
        if (codeJoin) {
            const deployedQuiz = await this.deployedQuizzesModel.findOne({
                codeJoin: codeJoin,
                expiredAt: { $gte: currentTimestamp }
            }).populate('user', 'fullname')
            if (!deployedQuiz) {
                this.logger.error(`get deployed quiz: query[${JSON.stringify(query)}] response[Not Found | expired]`)
                throw new NotFoundException('Quiz not open for join or expired.')
            }
            const finalQuiz = getQuizWithOutCorrectAnswer(deployedQuiz)
            this.logger.log(`get deployed quiz: query[${JSON.stringify(query)}] response[${JSON.stringify(finalQuiz)}]`)
            return finalQuiz
        }

        if (quizId) {
            const deployedQuiz = await this.deployedQuizzesModel.findOne({
                _id: quizId,
                expiredAt: { $gte: currentTimestamp }
            }).populate('user', 'fullname')
            if (!deployedQuiz) {
                this.logger.error(`get deployed quiz: query[${JSON.stringify(query)}] response[Not Found | expired]`)
                throw new NotFoundException('Quiz not open for join or expired.')
            }
            const finalQuiz = getQuizWithOutCorrectAnswer(deployedQuiz)
            this.logger.log(`get deployed quiz: query[${JSON.stringify(query)}] response[${JSON.stringify(finalQuiz)}]`)
            return finalQuiz
        }
    }

    async updateAnswer(userId: string, body: any, res: Response) {
        this.logger.log(`update answer: userId[${userId}] body[${JSON.stringify(body)}]`)
        const { quizId, answers, selectedQuestionId } = body
        if (!quizId || !answers) {
            this.logger.error(`update answer: userId[${userId}] body[${JSON.stringify(body)}] response[Bad Request]`)
            return res.status(HttpStatus.OK).json({ message: 'bad reqeust null' })
        }

        if (!mongoose.isValidObjectId(quizId)){
            this.logger.error(`update answer: userId[${userId}] body[${JSON.stringify(body)}] response[Bad Request]`)
            return res.status(HttpStatus.OK).json({ message: 'bad reqeust quizId' })
        }
        if (!mongoose.isValidObjectId(userId)){
            this.logger.error(`update answer: userId[${userId}] body[${JSON.stringify(body)}] response[Bad Request]`)
            return res.status(HttpStatus.OK).json({ message: 'bad reqeust userId' })
        }


        const runningQuiz = await this.runningQuizzesModel.findOneAndUpdate(
            { user: userId, copyof: quizId },
            { answers: answers, selectedQuestionId: selectedQuestionId }
        ).populate('copyof', 'expiredAt');

        if (runningQuiz) {
            if (isExpired(runningQuiz.copyof.expiredAt, true)) {
                this.logger.error(`update answer: userId[${userId}] body[${JSON.stringify(body)}] response[Time's up!]`)
                return res.status(HttpStatus.OK).json({ message: 'Time\'s up!, we going to redirect you to the result page.' })
            }

            // Perform the update operation here
            runningQuiz.answers = answers; // Assuming updatedAnswers contains the updated answers
            runningQuiz.expiredAt = runningQuiz.copyof.expiredAt; // Assuming updatedAnswers contains the updated answers
            await runningQuiz.save();
            const finalQuiz = getTakeQuizWithOutAnswer(runningQuiz)
            this.logger.log(`update answer: userId[${userId}] body[${JSON.stringify(body)}] response[${JSON.stringify(finalQuiz)}]`)
            return res.status(200).json({ quiz: finalQuiz });
        }

        this.logger.error(`update answer: userId[${userId}] body[${JSON.stringify(body)}] response[Not Found]`)
        return res.status(200).json({message: 'not found quiz'})
    }

    async takeQuiz(userId: string, res: Response, query: Query) {
        this.logger.log(`take quiz: userId[${userId}] query[${JSON.stringify(query)}]`)
        const { quizId } = query
        if (!quizId) {
            this.logger.error(`take quiz: userId[${userId}] query[${JSON.stringify(query)}] response[Bad Request]`)
            throw new BadRequestException('What you doing? this is not a quiz.')
        }

        if (!mongoose.isValidObjectId(quizId)){
            this.logger.error(`take quiz: userId[${userId}] query[${JSON.stringify(query)}] response[Bad Request]`)
            throw new BadRequestException('What you doing? this is not a quiz.')
        }
        if (!mongoose.isValidObjectId(userId)) {
            this.logger.error(`take quiz: userId[${userId}] query[${JSON.stringify(query)}] response[Bad Request]`)
            throw new BadRequestException('Server error can\'t find user.')
        }

        const runninQuiz = await this.runningQuizzesModel.findOne({
            user: userId,
            copyof: quizId
        }).populate('copyof', 'name expiredAt')

        if (runninQuiz) {
            if (isExpired(runninQuiz.copyof.expiredAt, false)) {
                this.logger.error(`take quiz: userId[${userId}] query[${JSON.stringify(query)}] response[Time's up!]`)
                throw new BadRequestException('Time\'s up!, we going to redirect you to the result page.')
            }

            const finalQuiz = getTakeQuizWithOutAnswer(runninQuiz)

            this.logger.log(`take quiz: userId[${userId}] query[${JSON.stringify(query)}] response[${JSON.stringify(finalQuiz)}]`)
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
            this.logger.error(`take quiz: userId[${userId}] query[${JSON.stringify(query)}] response[Not Found | expired]`)
            throw new NotFoundException('Quiz not found or expired.')
        }

        
        const expiredAt = getDateWithDuration(deployedQuiz.duration, 0)

        const data = {
            questions: deployedQuiz.questions,
            expiredAt: expiredAt,
            answers: []
        }
        const initialAnswerData = initialTakeQuizAnswer(data)
        Object.assign(initialAnswerData, { copyof: deployedQuiz._id })
        Object.assign(initialAnswerData, { user: userId })

        const takeQuiz = await this.runningQuizzesModel.create(initialAnswerData)
        await takeQuiz.populate('copyof', 'name expiredAt')
        const finalQuiz = getTakeQuizWithOutAnswer(takeQuiz)
        this.logger.log(`take quiz: userId[${userId}] query[${JSON.stringify(query)}] response[${JSON.stringify(finalQuiz)}]`)
        res.status(HttpStatus.OK)
        return res.send(finalQuiz)
    }


    // deploy quiz ( By Id )
    async deploy(id: string, userId: string): Promise<DeployedQuizzes> {
        this.logger.log(`deploy quiz: id[${id}] userId[${userId}]`)
        if (!mongoose.isValidObjectId(id)) {
            this.logger.error(`deploy quiz: id[${id}] userId[${userId}] response[Bad Request]`)
            throw new BadRequestException('Invalid quiz id.')
        }

        const quiz = await this.quizzesModel.findOne({
            _id: id,
            user: userId
        })
        if (!quiz) {
            this.logger.error(`deploy quiz: id[${id}] userId[${userId}] response[Not Found]`)
            throw new NotFoundException('Quiz not found or not owned.')
        }

        const expiredAt = getDateWithDuration(quiz.duration, 0)
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

        this.logger.log(`deploy quiz: id[${id}] userId[${userId}] response[${JSON.stringify(newDeployedQuiz)}]`)
        return newDeployedQuiz
    }

    // get running user quiz
    async getRunningQuizzes(userId: string): Promise<RunningQuizzes[]> {
        this.logger.log(`get running quizzes: userId[${userId}]`)
        if(!mongoose.isValidObjectId(userId)) {
            this.logger.error(`get running quizzes: userId[${userId}] response[Bad Request]`)
            throw new BadRequestException('Server error can\'t find user.')
        }
        
        const currentTimestamp = new Date();
        const runningQuizzes = await this.runningQuizzesModel.find({
            user: userId,
            expiredAt: { $gte: currentTimestamp}
        }).populate('copyof')
        .populate({
            path: 'copyof',
            populate: {
                path: 'user'
            }
        })

        this.logger.log(`get running quizzes: userId[${userId}] response[${JSON.stringify(runningQuizzes)}]`)
        const finalQuizzes = getRunningQuizzesWithOutCorrectAnswer(runningQuizzes)
        return finalQuizzes
    }


    // create quiz
    async create(newQuiz: Quizzes, user: User): Promise<Quizzes> {
        this.logger.log(`create quiz: userId[${user._id}]`)

        const data = Object.assign(newQuiz, { user: user._id })

        const quiz = await this.quizzesModel.create(data)
        await quiz.populate('user', 'fullname')
        this.logger.log(`create quiz: userId[${user._id}] response[${JSON.stringify(quiz)}]`)
        return quiz
    }


    // delete quiz ( By Id )
    async deleteByUser(id: string, userId: string, res: Response): Promise<Response> {

        if (!mongoose.isValidObjectId(id)) {
            this.logger.error(`delete quiz: id[${id}] userId[${userId}] response[Bad Request]`)
            throw new BadRequestException('Incorrect id.')
        }

        const deleted = await this.quizzesModel.findOneAndDelete({
            _id: id,
            user: userId
        })

        if (!deleted) {
            this.logger.error(`delete quiz: id[${id}] userId[${userId}] response[Not Found]`)
            throw new NotFoundException('Quiz not found or not owned.')
        }

        this.logger.log(`delete quiz: id[${id}] userId[${userId}] response[OK]`)
        return res.status(HttpStatus.OK).json({ message: 'Quiz deleted.'})
    }

    // update quiz ( By Id )
    async updateByUser(id: string, updateQuiz: Quizzes, userId: string): Promise<Quizzes> {
        if (!mongoose.isValidObjectId(id)) {
            this.logger.error(`update quiz: id[${id}] userId[${userId}] response[Bad Request]`)
            throw new BadRequestException('Incorrect id.')
        }

        const updateQuizFinal = { ...updateQuiz, codeJoin: undefined }

        const quiz = await this.quizzesModel.findOneAndUpdate({
            _id: id,
            user: userId
        }, updateQuizFinal, {
            new: true,
            runValidators: true
        })

        this.logger.log(`update quiz: id[${id}] userId[${userId}] response[${JSON.stringify(quiz)}]`)
        return quiz

        // return await this.quizzesModel.findByIdAndUpdate(id, updateQuiz, {
        //     new: true,
        //     runValidators: true
        // })
    }

}
