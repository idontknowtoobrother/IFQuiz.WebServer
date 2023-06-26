import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "../../auth/schemas/user.schema";
import { QuestionDto } from "../dto/question.dto";
import { Duration } from "../dto/duration.dto";
import { ApiProperty } from "@nestjs/swagger";

@Schema({ timestamps: true, collection: "quiz_deployed" })
export class DeployedQuizzes {

    @ApiProperty({
        description: 'Quiz name',
        type: String,
        example: 'Quiz 1'
    })
    @Prop({ require: true })
    name : string

    @ApiProperty({
        description: 'Quiz description',
        type: String,
        example: 'This is quiz 1'
    })
    @Prop({ required: true})
    description : string

    @ApiProperty({
        description: 'Quiz image url',
        type: String,
        example: 'f4c737e1-1321-4ab4-a642-83c088db401c.png'
    })
    @Prop({ default: ''})
    imageUrl: string

    @ApiProperty({
        description: 'Quiz points',
        type: Number,
        example: 10
    })
    @Prop({ required: true})
    points: number

    @ApiProperty({
        description: 'Quiz duration',
        type: Duration,
    })
    @Prop({required: true})
    duration: Duration

    @ApiProperty({
        description: 'User info',
        type: User,
        example: {
            _id: '60b9b0b9b3b3c3b9b3b3c3b9',
            fullname: 'Nguyen Van A'
        }
    })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    @ApiProperty({
        description: 'Hide correct answer',
        type: Boolean,
        example: false
    })
    @Prop({ required: true, default: false})
    hideCorrectAnswer: boolean
    
    @ApiProperty({
        description: 'List of questions',
        type: [QuestionDto],
    })
    @Prop({required: true})
    questions: QuestionDto[]

    @ApiProperty({
        description: 'Code join',
        type: String,
        example: 'UX5EF'
    })
    @Prop({required: true, unique: true})
    codeJoin: string

    @ApiProperty({
        description: 'Expired at',
        type: Date,
        example: '2021-06-05T15:00:00.000Z'
    })
    @Prop({required: true})
    expiredAt: Date

}

export const DeployedQuizzesSchema = SchemaFactory.createForClass(DeployedQuizzes)