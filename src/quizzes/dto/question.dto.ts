import { Prop } from "@nestjs/mongoose";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MinLength, isArray } from "class-validator";
import { SingleAnswer, MultipleAnswer, FillAnswer } from "./answer.dto";
import { ApiProperty } from "@nestjs/swagger";

export enum AnswerTypes {
    SINGLE_CHOICE = 'single-choice',
    MULTIPLE_CHOICE = 'multiple-choice',
    FILL_CHOICE = 'fill-choice',
}

export class Explanation {

    @ApiProperty({
        description: 'explaination text',
        type: String,
        example: 'explaination text'
    })
    @Prop({required: true})
    @IsNotEmpty()
    @MinLength(5)
    @IsString()
    readonly explain: string

    @ApiProperty({
        description: 'explaination image url',
        type: String,
        example: 'e44ad06e-fdda-4019-ad9b-310e95c690a5.png'
    })
    @IsOptional()
    @IsArray()
    readonly imageUrl: string[]

}

export class QuestionDto {

    @ApiProperty({
        description: 'Question points',
        type: Number,
        example: 10
    })
    @Prop({required: true})
    @IsNumber()
    @IsNotEmpty()
    readonly points : number

    @ApiProperty({
        description: 'Question explanation',
        type: Explanation,
    })
    @Prop({required: true})
    @IsNotEmpty()
    readonly explanation : Explanation

    @ApiProperty({
        description: 'Answers',
        type: [SingleAnswer, MultipleAnswer, FillAnswer],
    })
    @Prop({required: true})
    @IsNotEmpty()
    readonly answer : ( SingleAnswer[] | MultipleAnswer[] | FillAnswer[])[]

    @ApiProperty({
        description: 'Question type',
        type: String,
        example: 'single-choice'
    })
    @Prop({required: true})
    readonly type : AnswerTypes
}