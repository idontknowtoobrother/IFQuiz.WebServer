import { IsEnum, IsOptional, IsString, IsEmpty, IsNotEmpty } from "class-validator";
import { User } from "../../auth/schemas/user.schema";
import { Category } from "../schemas/quizzes.schema";
import { QuestionDto } from "./question.dto";

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

    @IsEmpty({ message: "Can't pass user id."}) // Author
    readonly user: User
    
    // @ TODO MORE
    // Question : Object
    @IsNotEmpty()
    readonly questions: QuestionDto[] = [];

}