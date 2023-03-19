import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "../../auth/schemas/user.schema";
import { QuestionDto } from "../dto/question.dto";


export enum Category {
    MATH = 'Mathematics',
    SCIENCE = 'Science',
    ENG = 'English Language',
    COMSCI = 'Computer Science',
    PE = 'Physical Education',
    ART = 'Creative Arts',
    LANGUAGE = 'World Language',
}

@Schema({ timestamps: true })
export class Quizzes {

    @Prop({ require: true })
    name : string

    @Prop({ required: true})
    description : string

    @Prop({required: true})
    category : Category

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    @Prop({ required: true, default: false})
    hideCorrectAnswer: boolean

    @Prop({required: true})
    questions: QuestionDto[]


}

export const QuizzesSchema = SchemaFactory.createForClass(Quizzes)