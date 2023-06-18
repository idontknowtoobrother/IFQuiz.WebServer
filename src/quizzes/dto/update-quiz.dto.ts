import { Prop } from "@nestjs/mongoose";
import { IsBoolean, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { User } from "../../auth/schemas/user.schema";
import { QuestionDto } from "./question.dto";
import { Duration } from './duration.dto'

export class UpdateQuizDto {

    @IsNotEmpty()
    @MinLength(3)
    @IsString()
    readonly name : string

    @IsNotEmpty()
    @MinLength(5)
    @IsString()
    readonly description : string

    @IsString()
    @IsOptional()
    readonly imageUrl: string

    @IsNumber()
    readonly points: number

    @IsEmpty({ message: "Duration can't be empty."})
    readonly duration: Duration

    @IsOptional()
    @IsBoolean()
    @Prop({default: false})
    readonly hideCorrectAnswer: boolean

    @IsNotEmpty()
    readonly questions: QuestionDto[] = [];

    @IsEmpty({ message: "Can't pass user id."}) // Author
    readonly user: User

}