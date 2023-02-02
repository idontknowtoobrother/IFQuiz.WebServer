import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Quizzes } from './schemas/quizzes.schema';

import { Query } from 'express-serve-static-core'
import { BadRequestException } from '@nestjs/common/exceptions';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class QuizzesService {
    constructor(
        @InjectModel(Quizzes.name)
        private quizzesModel: Model<Quizzes>
    ){}

    // get all quizzes
    async getAll(query: Query) : Promise<Quizzes[]>{
        
        const keyword = query.name ? {
            name: {
                $regex: query.name,
                $options: 'i'
            }
        } : {}

        const quizzes = await this.quizzesModel.find({ ...keyword })
        return quizzes
    }

    // get one quiz ( By Id )
    async get(id: string) : Promise<Quizzes> {
        if(!mongoose.isValidObjectId(id)) throw new BadRequestException('Incorrect id.')

        const quiz = await this.quizzesModel.findById(id)
        if(!quiz){
            throw new NotFoundException('Quiz not found!')
        }
        return quiz
    }

    // create quiz
    async create(newQuiz: Quizzes, user: User) : Promise<Quizzes> {

        const data = Object.assign(newQuiz, {user: user._id})
        
        const quiz = await this.quizzesModel.create(data)

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

        return await this.quizzesModel.findOneAndUpdate({
            _id: id,
            user: userId
        }, updateQuiz, {
            new: true,
            runValidators: true
        })

        // return await this.quizzesModel.findByIdAndUpdate(id, updateQuiz, {
        //     new: true,
        //     runValidators: true
        // })
    }

}
