import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Quizzes } from './schemas/quizzes.schema';

import { Query } from 'express-serve-static-core'
import { BadRequestException } from '@nestjs/common/exceptions';
import { User } from '../auth/schemas/user.schema';
import { generateQuizCode } from '../utils/functions/quiz-code-generator.utils'

@Injectable()
export class QuizzesService {
    constructor(
        @InjectModel(Quizzes.name)
        private quizzesModel: Model<Quizzes>
    ){}

    // get all quizzes
    async getAll(query: Query, userId: string) : Promise<Quizzes[]>{
        
        const keyword = query.name ? {
            name: {
                $regex: query.name,
                $options: 'i'
            },
            deployed: true
        } :  query.codeJoin ? {
            codeJoin: query.codeJoin
        } : {
            deployed: true
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
            }else if(quizzes[0]?.deployed === false){
                throw new NotFoundException('This quiz is not open for test right now.')
            }
        }

        return quizzes
    }

    // get one quiz ( By Id )
    async get(id: string) : Promise<Quizzes> {
        if(!mongoose.isValidObjectId(id)) throw new BadRequestException('Quiz not found!')

        const quiz = await this.quizzesModel.findById(id).populate('user', 'fullname')

        if(!quiz){
            throw new NotFoundException('Quiz not found!')
        }
        if(!quiz.deployed){ 
            throw new NotFoundException('This quiz is not open for test right now.')
        }

        return quiz
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
