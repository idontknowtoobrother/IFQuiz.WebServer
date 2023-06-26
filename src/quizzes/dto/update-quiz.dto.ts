import { Prop } from "@nestjs/mongoose";
import { IsBoolean, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { User } from "../../auth/schemas/user.schema";
import { QuestionDto } from "./question.dto";
import { Duration } from './duration.dto'
import { ApiProperty } from "@nestjs/swagger";

export class UpdateQuizDto {

    @ApiProperty({
        description: 'Quiz id',
        type: String,
        example: '5f9d7b3b9d3f3b2b6c9b4b1c'
    })
    @IsOptional()
    readonly _id: string

    @ApiProperty({
        description: 'Quiz name',
        type: String,
        example: 'Quiz 1'
    })
    @IsNotEmpty()
    @MinLength(3)
    @IsString()
    readonly name : string

    @ApiProperty({
        description: 'Quiz description',
        type: String,
        example: 'Quiz 1 description'
    })
    @IsNotEmpty()
    @MinLength(5)
    @IsString()
    readonly description : string

    @ApiProperty({
        description: 'Quiz image url',
        type: String,
        example: "f5db753d-f128-4656-914e-46daa7da59ef.png"
    })
    @IsString()
    @IsOptional()
    readonly imageUrl: string

    @ApiProperty({
        description: 'Quiz points',
        type: Number,
        example: 10
    })
    @IsNumber()
    readonly points: number

    @ApiProperty({
        description: 'Quiz duration',
        type: Duration,
    })
    @IsNotEmpty({ message: "Duration can't be empty."})
    readonly duration: Duration

    @ApiProperty({
        description: 'Quiz hide correct answer',
        type: Boolean,
        example: false
    })
    @IsOptional()
    @IsBoolean()
    @Prop({default: false})
    readonly hideCorrectAnswer: boolean

    @ApiProperty({
        description: 'Quiz questions',
        type: [QuestionDto],
    })
    @IsNotEmpty()
    readonly questions: QuestionDto[] = [];

    @ApiProperty({
        description: 'Quiz author',
        type: User,
        example: {
            _id: '60b9b0b9b3b3c3b9b3b3c3b9',
            fullname: 'Nguyen Van A'
        }
    })
    @IsEmpty({ message: "Can't pass user id."}) // Author
    readonly user: User

}