import { Prop } from "@nestjs/mongoose";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MinLength } from "class-validator";
import { SingleAnswer, MultipleAnswer, FillAnswer } from "./answer.dto";

export enum AnswerTypes {
    SINGLE_CHOICE = 'single-choice',
    MULTIPLE_CHOICE = 'multiple-choice',
    FILL_CHOICE = 'fill-choice',
}

export class Explanation {

    @Prop({required: true})
    @IsNotEmpty()
    @MinLength(5)
    @IsString()
    readonly explain: string

    @IsOptional()
    @IsUrl()
    @IsString()
    readonly imageUrl: string

}

export class QuestionDto {

    @Prop({required: true})
    @IsNumber()
    @IsNotEmpty()
    readonly points : number

    @Prop({required: true})
    @IsNotEmpty()
    readonly explanation : Explanation

    @Prop({required: true})
    @IsNotEmpty()
    readonly answer : ( SingleAnswer[] | MultipleAnswer[] | FillAnswer[])[]

    @Prop({required: true})
    readonly type : AnswerTypes
}