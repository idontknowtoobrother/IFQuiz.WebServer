import { Prop } from "@nestjs/mongoose";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MinLength } from "class-validator";
import { Answers } from "./answer.dto";


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
    readonly answer : Answers

    @Prop({required: true})
    readonly type : string
}