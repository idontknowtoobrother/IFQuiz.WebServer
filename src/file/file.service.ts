import { Injectable, StreamableFile, HttpStatus, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import * as fs from 'fs';
import { Quizzes } from 'src/quizzes/schemas/created.quizzes.schema';

@Injectable()
export class FileService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        @InjectModel(Quizzes.name)
        private quizzesModel: Model<Quizzes>
    ){}

    private readonly logger = new Logger(FileService.name)

    async updateProfileImage(userId: string, newImagePath: string): Promise<String>{
        this.logger.log(`updateProfileImage: ${userId} ${newImagePath}`)

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
        this.logger.log(`updateProfileImage-response: ${userId} ${newImagePath}`)
        return newImagePath
    }


    async uploadQuestionImage(userId: string, questionId: number, newImagePath: string, res: any) {
        this.logger.log(`uploadQuestionImage: ${userId} ${questionId} ${newImagePath}`)
        const imageFileName = newImagePath;
        
        this.logger.log(`uploadQuestionImage-response: ${userId} ${questionId} ${imageFileName}`)
        return res.status(HttpStatus.CREATED).json({
            imageUrl: imageFileName,
            questionId: questionId
        })

        // for make log
        // or improve this in future
    }

    async uploadQuizCoverImage(userId: string, quizId: string, newImagePath: string): Promise<String> {
        this.logger.log(`uploadQuizCoverImage: ${userId} ${quizId} ${newImagePath}`)
        const quiz = await this.quizzesModel.findById(quizId).populate('user', '_id')

        if(quiz.user._id.toString() !== userId.toString()){
            this.logger.error(`uploadQuizCoverImage: ${userId} ${quizId} ${newImagePath}`)
            throw new Error('You are not author of this quiz!')
        }

        // Remove this cause when we edit new picture, old picture of deployed quiz will be deleted
        // if(quiz.imageUrl){
        //     fs.unlink(`./resources/quiz-cover-image/${quiz.imageUrl}`, (err) => {})
        // }

        await this.quizzesModel.findOneAndUpdate({
            _id: quizId,
        },{
            imageUrl: newImagePath
        },{
            new: true,
            runValidators: true
        })

        this.logger.log(`uploadQuizCoverImage-response: ${userId} ${quizId} ${newImagePath}`)
        return newImagePath
    }

}
