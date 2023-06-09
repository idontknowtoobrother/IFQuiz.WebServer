import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "../../auth/schemas/user.schema";
import { Quizzes } from "../../quizzes/schemas/quizzes.schema";
import { QuizzAnswerDto } from "../dto/quiz_answer.dto";

@Schema({ timestamps: true })
export class CheckQuizz {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    userAnswers: QuizzAnswerDto["userAnswers"]
    
    @Prop({ required: true})
    quiz: Quizzes

    @Prop({ required: true})
    score: number

}

export const CheckQuizzSchema = SchemaFactory.createForClass(CheckQuizz)