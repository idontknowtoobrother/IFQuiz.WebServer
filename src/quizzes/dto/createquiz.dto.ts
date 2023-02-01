import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Category } from "../schemas/quizzes.schema";

export class CreateQuizDto {

    @IsNotEmpty()
    @IsString()
    readonly name : string

    @IsNotEmpty()
    @IsString()
    readonly description : string

    @IsNotEmpty()
    @IsEnum(Category)
    readonly category : Category

    // @ TODO MORE
    // Question : Object


}