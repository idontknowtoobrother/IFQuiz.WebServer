import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Quizzes } from './schemas/quizzes.schema';
import { DeployedQuizzes} from './schemas/deployed-quizzes.schema';

import { Query } from 'express-serve-static-core'
import { BadRequestException } from '@nestjs/common/exceptions';
import { User } from '../auth/schemas/user.schema';
import { generateQuizCode } from '../utils/functions/quiz-code-generator.utils'

import { getQuizzesWithOutCorrectAnswer, getQuizWithOutCorrectAnswer } from 'src/utils/functions/quiz-remove-correct-answer.utils';
import { diffAddForQuizDeploy } from '../utils/constrains';

@Injectable()
export class QuizzesService {
    constructor(
        @InjectModel(Quizzes.name)
        private quizzesModel: Model<Quizzes>,
        @InjectModel(DeployedQuizzes.name)
        private deployedQuizzesModel: Model<DeployedQuizzes>
    ){}

    // get all quizzes
    async getAll(query: Query, userId: string) : Promise<Quizzes[]>{
        const keyword = query.name ? {
            name: {
                $regex: query.name,
                $options: 'i'
            }
        } : {}

        if(query.owned){
            const quizzes = await this.quizzesModel.find({ 
                user: userId,
            }).populate('user', 'fullname')
            return quizzes
        }

        const quizzes = await this.quizzesModel.find({ ...keyword }).populate('user', 'fullname')
        

        return quizzes
    }
    
    // get edit one quiz ( By Id )
    async getEditQuiz(id: string, userId: string) : Promise<Quizzes> {
        if(!mongoose.isValidObjectId(id)) throw new BadRequestException('Quiz not found!')

        // get quiz for edit
        const quiz = await this.quizzesModel.findOne({ 
            _id: id,
            user: userId
        }).populate('user', 'fullname')
        if(!quiz){
            throw new NotFoundException('Quiz not found or not owned.')
        }
        return quiz
       
    }

    // get all deployed quizzes
    async getAllDeployed(query: Query) : Promise<DeployedQuizzes[] | DeployedQuizzes>{
        const { codeJoin, quizId } = query
        if(codeJoin || quizId){
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
    async getDeployed(query: Query) : Promise<DeployedQuizzes> {
        const { codeJoin, quizId } = query

        const currentTimestamp = new Date();
        // get by code join
        if(codeJoin){
            const deployedQuiz = await this.deployedQuizzesModel.findOne({ 
                codeJoin: codeJoin,
                expiredAt: { $gte: currentTimestamp }
             }).populate('user', 'fullname')
            if(!deployedQuiz){
                throw new NotFoundException('Quiz not open for join or expired.')
            }
            const finalQuiz = getQuizWithOutCorrectAnswer(deployedQuiz)
            return finalQuiz
        }

        if(quizId){
            const deployedQuiz = await this.deployedQuizzesModel.findOne({ 
                _id: quizId,
                expiredAt: { $gte: currentTimestamp }
             }).populate('user', 'fullname')
            if(!deployedQuiz){
                throw new NotFoundException('Quiz not open for join or expired.')
            }
            const finalQuiz = getQuizWithOutCorrectAnswer(deployedQuiz)
            return finalQuiz
        }
    }


    // deploy quiz ( By Id )
    async deploy(id: string, userId: string) : Promise<DeployedQuizzes> {
        if(!mongoose.isValidObjectId(id)) throw new BadRequestException('Quiz not found!')
        
        const quiz = await this.quizzesModel.findOne({
            _id: id,
            user: userId
        })
        if(!quiz){
            throw new NotFoundException('Quiz not found or not owned.')
        }

        // get duration when deploy give it more 3 minutes for diff time
        // like Internet Down or something
        const durationMilliseconds = ((quiz.duration.hours * 60 * 60 * 1000) + (quiz.duration.minutes * 60 * 1000)) + diffAddForQuizDeploy;

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
            expiredAt: new Date(Date.now() + durationMilliseconds)
        }

        do {
            deployedQuiz.codeJoin = generateQuizCode(6);
        }while(await this.deployedQuizzesModel.findOne({codeJoin: deployedQuiz.codeJoin}))
        
        const newDeployedQuiz = await this.deployedQuizzesModel.create(deployedQuiz)

        return newDeployedQuiz
    }


    // create quiz
    async create(newQuiz: Quizzes, user: User) : Promise<Quizzes> {


        const data = Object.assign(newQuiz, {user: user._id})

        const quiz = await this.quizzesModel.create(data)
        await quiz.populate('user', 'fullname')
        return quiz
    }


    // delete quiz ( By Id )
    async deleteByUser(id: string, userId: string) : Promise<string> {


        if(!mongoose.isValidObjectId(id)) throw new BadRequestException('Incorrect id.')

        const res = await this.quizzesModel.findOneAndDelete({
            _id: id,
            user: userId
        })
        
        if(!res){
            throw new NotFoundException('Quiz not found or not owned.')
        }

        return 'Quiz deleted.'
    }

    // update quiz ( By Id )
    async updateByUser(id: string, updateQuiz: Quizzes, userId: string) : Promise<Quizzes> {
        if(!mongoose.isValidObjectId(id)) throw new BadRequestException('Incorrect id.')

        const updateQuizFinal = {...updateQuiz, codeJoin: undefined}

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
