import { IsEmpty, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { User } from "../../auth/schemas/user.schema";
import { Category } from "../schemas/quizzes.schema";

export class CreateQuizDto {

    @IsNotEmpty()
    @IsString()
    readonly name : string

    @IsNotEmpty()
    @IsString()
    readonly description : string

    @IsNotEmpty()
    @IsEnum(Category, { message: "Incorrect category." })
    readonly category : Category

    @IsEmpty({ message: "Can't pass user id."}) // Author
    readonly user: User

    // @ TODO MORE
    // Question : Object

}