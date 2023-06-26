import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Duration } from "../dto/duration.dto";
import { User } from "src/auth/schemas/user.schema";
import { QuestionDto } from "../dto/question.dto";
import { DeployedQuizzes } from "./deployed.quizzes.schema";
import { ApiProperty } from "@nestjs/swagger";
import { UserFillAnswers, UserMultipleAnswer, UserSingleAnswer } from "../dto/user.answer.dto";

@Schema({timestamps: true, collection: 'quiz_running'})
export class RunningQuizzes {


    // @Prop({ require: true })
    // name : string

    // @Prop({ required: true})
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
        description: 'Expired at',
        type: Date,
        example: '2021-06-04T14:00:00.000Z'
    })
    @Prop({required: true})
    expiredAt: Date

    @ApiProperty({
        description: 'List of answers',
        type: [UserSingleAnswer, UserMultipleAnswer, UserFillAnswers],
    })
    @Prop({default: []})
    answers: (UserSingleAnswer[] | UserMultipleAnswer[] | UserFillAnswers[])

    @ApiProperty({
        description: 'Selected question id',
        type: Number,
        example: 2
    })
    @Prop({default:0})
    selectedQuestionId: number

}

export const RunningQuizzesSchema = SchemaFactory.createForClass(RunningQuizzes)