import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "../../auth/schemas/user.schema";
import { QuestionDto } from "../dto/question.dto";
import { Duration } from "../dto/duration.dto";

@Schema({ timestamps: true })
export class DeployedQuizzes {

    @Prop({ require: true })
    name : string

    @Prop({ required: true})
    description : string

    @Prop({ default: ''})
    imageUrl: string

    @Prop({ required: true})
    points: number

    @Prop({required: true})
    duration: Duration

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    @Prop({ required: true, default: false})
    hideCorrectAnswer: boolean
    
    @Prop({required: true})
    questions: QuestionDto[]

    @Prop({required: true, unique: true})
    codeJoin: string

    @Prop({required: true})
    expiredAt: Date

}

export const DeployedQuizzesSchema = SchemaFactory.createForClass(DeployedQuizzes)