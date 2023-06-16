import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "../../auth/schemas/user.schema";
import { QuestionDto } from "../dto/question.dto";

@Schema({ timestamps: true })
export class Quizzes {

    @Prop({ require: true })
    name : string

    @Prop({ required: true})
    description : string


    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    @Prop({ required: true, default: false})
    hideCorrectAnswer: boolean
    
    @Prop({required: true})
    questions: QuestionDto[]

    @Prop({required: true, unique: true})
    codeJoin: string

    @Prop({default: false})
    deployed: boolean
}

export const QuizzesSchema = SchemaFactory.createForClass(Quizzes)