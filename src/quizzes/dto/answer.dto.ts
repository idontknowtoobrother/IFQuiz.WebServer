import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { Prop } from "@nestjs/mongoose";

export enum AnswerTypes {
    SINGLE_CHOICE = 'single-choice',
    MULTIPLE_CHOICE = 'multiple-choice',
    FILL_CHOICE = 'fill-choice',
}

export enum FillTypes {
    IS_EXACTLY = 'is-exactly',
    CONTAINS = 'contains'
}

class Answers {}

class Answer {

    @Prop({required: true})
    @IsString()
    @MinLength(8)
    readonly explanation : string

    @IsOptional()
    @IsString()
    readonly imageUrl : string

}

export class SingleAnswer extends Answers {

    @Prop({required: true})
    readonly type : AnswerTypes.SINGLE_CHOICE

    @Prop({required: true})
    @IsNotEmpty()
    @IsArray()
    readonly selectAnswers: Answer[]
    
    @Prop({required: true})
    @IsNumber()
    readonly correctAnswer: number
    
}

export class MultipleAnswer extends Answers {

    @Prop({required: true})
    readonly type : AnswerTypes.MULTIPLE_CHOICE
    
    @Prop({required: true})
    @IsNotEmpty()
    @IsArray()
    readonly selectAnswers: Answer[]

    @Prop({required: true})
    @IsArray()
    readonly correctAnswers: number[]

}

export class Fill {
    
    @Prop({required: true})
    readonly type: FillTypes

    @Prop({required: true})
    @IsNotEmpty()
    readonly matchString: string

}

export class FillAnswer extends Answers {

    @Prop({required: true})
    readonly type : AnswerTypes.FILL_CHOICE

    @Prop({required: true})
    @IsArray()
    readonly correctAnswers: Fill[]
    
}