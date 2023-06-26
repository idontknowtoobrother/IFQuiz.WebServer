import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "../../auth/schemas/user.schema";
import { QuestionDto } from "../dto/question.dto";
import { Duration } from "../dto/duration.dto";
import { ApiProperty } from "@nestjs/swagger";

@Schema({ timestamps: true, collection: "quiz_created" })
export class Quizzes {

    @ApiProperty({
        description: 'Quiz name',
        type: String,
        example: 'Quiz 1'
    })
    @Prop({ require: true })
    name: string

    @ApiProperty({
        description: 'Quiz description',
        type: String,
        example: 'Quiz 1 description'
    })
    @Prop({ required: true })
    description: string

    @ApiProperty({
        description: 'Quiz image url',
        type: String,
        example: "f5db753d-f128-4656-914e-46daa7da59ef.png"
    })
    @Prop({ default: '' })
    imageUrl: string

    @ApiProperty({
        description: 'Quiz points',
        type: Number,
        example: 10
    })
    @Prop({ required: true })
    points: number

    @ApiProperty({
        description: 'Quiz duration',
        type: Duration,
        example: {
            hours: 1,
            minutes: 30,
        }
    })
    @Prop({ required: true })
    duration: Duration

    @ApiProperty({
        description: 'Quiz user',
        type: User,
        example: {
            _id: '5f9d7b3b9d3f3b2b6c9b4b1c',
        }
    })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    @ApiProperty({
        description: 'Hide correct answer',
        type: Boolean,
        example: false
    })
    @Prop({ required: true, default: false })
    hideCorrectAnswer: boolean

    @ApiProperty({
        description: 'Quiz questions',
        type: [QuestionDto],
        example: QuestionDto
    })
    @Prop({ required: true })
    questions: QuestionDto[]

}

export const QuizzesSchema = SchemaFactory.createForClass(Quizzes)