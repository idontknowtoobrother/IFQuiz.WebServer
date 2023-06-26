import { ApiProperty } from "@nestjs/swagger"

export class UserSingleAnswer {
    @ApiProperty({
        description: 'Question id',
        type: Number,
        example: 1
    })
    questionId: number

    @ApiProperty({
        description: 'Selected answer id',
        type: Number,
        example: 1
    })
    selectedId: number
}

export class UserMultipleAnswer {
    @ApiProperty({
        description: 'Question id',
        type: Number,
        example: 1
    })
    questionId: number

    @ApiProperty({
        description: 'Selected answer id',
        type: [Number],
        example: [0, 3, 1]
    })
    selectedIds: number[]
}

export class UserFillAnswers {
    @ApiProperty({
        description: 'Question id',
        type: Number,
        example: 1
    })
    questionId: number
    
    @ApiProperty({
        description: 'Match string',
        type: String,
        example: 'Hello'
    })
    matchString: string
}