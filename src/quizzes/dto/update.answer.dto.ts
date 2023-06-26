import { ApiProperty } from "@nestjs/swagger"
import { UserFillAnswers, UserMultipleAnswer, UserSingleAnswer } from "./user.answer.dto"

export class UpdateAnswersDto {
    @ApiProperty({
        description: 'Id of running quiz',
        type: String,
        example: '5f9d7b3b9d3f3b2b6c9b4b1c'
    })
    quizId: string

    @ApiProperty({
        description: 'List of answers',
        type: [UserSingleAnswer, UserMultipleAnswer, UserFillAnswers],
    })
    answers: (UserSingleAnswer[] | UserMultipleAnswer[] | UserFillAnswers[])

    @ApiProperty({
        description: 'Question id',
        type: Number,
        example: 1
    })
    selectedQuestionId: number
}