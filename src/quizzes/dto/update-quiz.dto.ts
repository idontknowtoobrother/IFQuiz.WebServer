import { IsEnum, IsOptional, IsString } from "class-validator";
import { Category } from "../schemas/quizzes.schema";

export class UpdateQuizDto {

    @IsOptional()
    @IsString()
    readonly name : string

    @IsOptional()
    @IsString()
    readonly description : string

    @IsOptional()
    @IsEnum(Category)
    readonly category : Category

    // @ TODO MORE
    // Question : Object

}