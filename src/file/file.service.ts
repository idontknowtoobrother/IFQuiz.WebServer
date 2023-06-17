import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import * as fs from 'fs';
import { Quizzes } from 'src/quizzes/schemas/quizzes.schema';

@Injectable()
export class FileService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        @InjectModel(Quizzes.name)
        private quizzesModel: Model<Quizzes>
    ){}


    async updateProfileImage(userId: string, newImagePath: string): Promise<String>{
        const user = await this.userModel.findById(userId, 'imageUrl')
        if(user.imageUrl){
            fs.unlink(`./resources/profile-image/${user.imageUrl}`, (err) => {})
        }

        await this.userModel.findOneAndUpdate({
            _id: userId
        },{
            imageUrl: newImagePath
        },{
            new: true,
            runValidators: true
        })
        return newImagePath
    }


    async uploadQuizCoverImage(userId: string, quizId: string, newImagePath: string): Promise<String> {

        const quiz = await this.quizzesModel.findById(quizId).populate('user', '_id')

        if(quiz.user._id.toString() !== userId.toString()){
            throw new Error('You are not author of this quiz!')
        }

        if(quiz.imageUrl){
            fs.unlink(`./resources/quiz-cover-image/${quiz.imageUrl}`, (err) => {})
        }

        await this.quizzesModel.findOneAndUpdate({
            _id: quizId,
        },{
            imageUrl: newImagePath
        },{
            new: true,
            runValidators: true
        })

        return newImagePath
    }

}
