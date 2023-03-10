import { IsEmpty, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { User } from "../../auth/schemas/user.schema";
import { Category } from "../schemas/quizzes.schema";
import { QuestionDto } from "./question.dto";

export class CreateQuizDto {

    @IsNotEmpty()
    @MinLength(3)
    @IsString()
    readonly name : string

    @IsNotEmpty()
    @MinLength(5)
    @IsString()
    readonly description : string

    @IsNotEmpty()
    @IsEnum(Category, { message: "Incorrect category." })
    readonly category : Category

    @IsEmpty({ message: "Can't pass user id."}) // Author
    readonly user: User

    // @ TODO MORE
    // questions : QuestionDto[]
    @IsNotEmpty()
    readonly questions: QuestionDto[] = [];

}