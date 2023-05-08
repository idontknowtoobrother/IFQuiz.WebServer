import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "../../auth/schemas/user.schema";
import { Quizzes } from "../../quizzes/schemas/quizzes.schema";

@Schema({ timestamps: true })
export class CheckQuizz {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User
    
    @Prop({ required: true})
    quiz: Quizzes

    @Prop({ required: true})
    score: number

}

export const CheckQuizzSchema = SchemaFactory.createForClass(CheckQuizz)