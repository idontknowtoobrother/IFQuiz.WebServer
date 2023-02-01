import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quizzes } from './schemas/quizzes.schema';

@Injectable()
export class QuizzesService {
    constructor(
        @InjectModel(Quizzes.name)
        private quizzesModel: Model<Quizzes>
    ){}

    // get all quizzes
    async findAll() : Promise<Quizzes[]>{
        const quizzes = this.quizzesModel.find()
        return quizzes
    }



}
