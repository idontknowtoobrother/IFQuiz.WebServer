import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Quizzes } from './schemas/quizzes.schema';
import { DeployedQuizzes} from './schemas/deployed-quizzes.schema';

import { Query } from 'express-serve-static-core'
import { BadRequestException } from '@nestjs/common/exceptions';
import { User } from '../auth/schemas/user.schema';
import { generateQuizCode } from '../utils/functions/quiz-code-generator.utils'

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
        } :  query.codeJoin ? {
            codeJoin: query.codeJoin
        } : {
            
        }

        if(query.owned){
            const quizzes = await this.quizzesModel.find({ 
                user: userId,
            }).populate('user', 'fullname')
            return quizzes
        }

        const quizzes = await this.quizzesModel.find({ ...keyword }).populate('user', 'fullname')
        
        // get quiz by code
        if(query.codeJoin){
            if(!quizzes[0]) {
                throw new NotFoundException('Quiz not found!')
            }
        }

        return quizzes
    }

    // get one quiz ( By Id )
    async get(id: string, userId: string) : Promise<Quizzes> {
        if(!mongoose.isValidObjectId(id)) throw new BadRequestException('Quiz not found!')

        // get quiz for edit
        if(userId){
            const quiz = await this.quizzesModel.findOne({ 
                _id: id,
                user: userId
            }).populate('user', 'fullname')
            if(!quiz){
                throw new NotFoundException('Quiz not found or not owned.')
            }
            return quiz
        }

        const quiz = await this.quizzesModel.findById(id).populate('user', 'fullname')

        if(!quiz){
            throw new NotFoundException('Quiz not found!')
        }

        return quiz
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

        const durationMilliseconds = ((quiz.duration.hours * 60 * 60 * 1000) + (quiz.duration.minutes * 60 * 1000)) + 180000;

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

        do {
            data.codeJoin = generateQuizCode(6);
        } while (await this.quizzesModel.findOne({codeJoin: data.codeJoin}));

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
