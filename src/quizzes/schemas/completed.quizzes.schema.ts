import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Duration } from "../dto/duration.dto";
import { User } from "src/auth/schemas/user.schema";
import { QuestionDto } from "../dto/question.dto";
import { DeployedQuizzes } from "./deployed.quizzes.schema";
import { ApiProperty } from "@nestjs/swagger";
import { UserFillAnswers, UserMultipleAnswer, UserSingleAnswer } from "../dto/user.answer.dto";

@Schema({timestamps: true, collection: 'quiz_completed', versionKey: false})
export class CompletedQuizzes {


    // @Prop({ require: true })
    // name : string

    // @Prop({ required: true})3
    
    // description : string

    // @Prop({ default: ''})
    // imageUrl: string

    // @Prop({ required: true})
    // points: number

    // @Prop({required: true})
    // duration: Duration
    @ApiProperty({
        description: 'User info',
        type: String,
        example: {
            _id: '60b9b0b9b3b3c3b9b3b3c3b9',
            fullname: 'Nguyen Van A'
        }
    })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    // @Prop({ required: true, default: false})
    // hideCorrectAnswer: boolean
    
    @ApiProperty({
        description: 'List of questions',
        type: [QuestionDto],
    })
    @Prop({required: true})
    questions: QuestionDto[]

    // @Prop({required: true, unique: true})
    // codeJoin: string
    
    @ApiProperty({
        description: 'Copy of deployed quiz',
        type: DeployedQuizzes,
    })
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'DeployedQuizzes'})
    copyof: DeployedQuizzes

    @ApiProperty({
        description: 'Time when quiz is expired',
        type: Date,
        example: '2021-06-04T07:00:00.000Z'
    })
    @Prop({required: true})
    expiredAt: Date

    @ApiProperty({
        description: 'List of answers',
        type: [UserSingleAnswer, UserMultipleAnswer, UserFillAnswers],
    })
    @Prop({required: true, default: []})
    answers: (UserSingleAnswer[] | UserMultipleAnswer[] | UserFillAnswers[])

    @ApiProperty({
        description: 'Selected question id',
        type: Number,
        example: 1
    })
    @Prop({required:true, default:0})
    selectedQuestionId: number

    @ApiProperty({
        description: 'Score',
        type: Number,
        example: 10
    })
    @Prop({required:true, default:0})
    score: number

}

export const CompletedQuizzesSchema = SchemaFactory.createForClass(CompletedQuizzes)