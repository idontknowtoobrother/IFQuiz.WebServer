import { Prop } from "@nestjs/mongoose";
import { CreateQuizDto } from "../../quizzes/dto/create-quiz.dto";
import { IsString } from "class-validator";

class RoomInformation {

    @Prop({required: true})
    @IsString()
    _id: string

    name: CreateQuizDto["name"];

    description: CreateQuizDto["description"];


    user: CreateQuizDto["user"];

    hideCorrectAnswer: CreateQuizDto["hideCorrectAnswer"];

    questions: CreateQuizDto['questions'];

}

export class QuizzAnswerDto {
    
    
    @Prop({required: true})
    userAnswers: (number[] | string | number)[]

    @Prop({required: true})
    roomInformation: RoomInformation

}