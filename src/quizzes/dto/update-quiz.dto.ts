import { IsEnum, IsOptional, IsString, IsEmpty } from "class-validator";
import { User } from "../../auth/schemas/user.schema";
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

    @IsEmpty({ message: "Can't pass user id."}) // Author
    readonly user: User
    
    // @ TODO MORE
    // Question : Object

}