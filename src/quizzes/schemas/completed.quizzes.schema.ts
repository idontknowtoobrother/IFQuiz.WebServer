import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Duration } from "../dto/duration.dto";
import { User } from "src/auth/schemas/user.schema";
import { QuestionDto } from "../dto/question.dto";
import { DeployedQuizzes } from "./deployed.quizzes.schema";

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

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    // @Prop({ required: true, default: false})
    // hideCorrectAnswer: boolean
    
    @Prop({required: true})
    questions: QuestionDto[]

    // @Prop({required: true, unique: true})
    // codeJoin: string
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'DeployedQuizzes'})
    copyof: DeployedQuizzes

    @Prop({required: true})
    expiredAt: Date

    @Prop({required: true, default: []})
    answers: any[]

    @Prop({required:true, default:0})
    selectedQuestionId: number

    @Prop({required:true, default:0})
    score: number

}

export const CompletedQuizzesSchema = SchemaFactory.createForClass(CompletedQuizzes)