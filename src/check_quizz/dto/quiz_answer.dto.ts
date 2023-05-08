import { Prop } from "@nestjs/mongoose";
import { CreateQuizDto } from "../../quizzes/dto/create-quiz.dto";
import { IsString } from "class-validator";

class RoomInformation {

    @Prop({required: true})
    @IsString()
    _id: string

    name: CreateQuizDto["name"];

    description: CreateQuizDto["description"];

    category: CreateQuizDto["category"];

    user: CreateQuizDto["user"];

    hideCorrectAnswer: CreateQuizDto["hideCorrectAnswer"];

    questions: Array<any>

}

export class QuizzAnswerDto {
    
    
    @Prop({required: true})
    userAnswer: (string | number | number[])[]

    @Prop({required: true})
    roomInformation: RoomInformation

}