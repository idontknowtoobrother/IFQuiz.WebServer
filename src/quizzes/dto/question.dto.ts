import { Prop } from "@nestjs/mongoose";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MinLength } from "class-validator";
import { Answers } from "./answer.dto";


export class Explanation {

    @Prop({required: true})
    @IsNotEmpty()
    @MinLength(5)
    @IsString()
    readonly explanation: string

    @IsOptional()
    @IsUrl()
    @IsString()
    readonly imageUrl: string

}

export class QuestionDto {

    @Prop({required: true})
    @IsNumber()
    @IsNotEmpty()
    readonly timer : number

    @Prop({required: true})
    @IsNumber()
    @IsNotEmpty()
    readonly points : number

    @Prop({required: true})
    @IsNotEmpty()
    readonly explanation : Explanation

    @Prop({required: true})
    @IsNotEmpty()
    readonly answers : Answers

}