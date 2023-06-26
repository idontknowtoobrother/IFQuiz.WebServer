import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UploadImageResponseDto {
    
    @ApiProperty({
        description: "image url of the user",
        type: String,
        example: "41f0d303-9c68-41e2-9f5e-3aed60906128.png"
    })
    @IsString()
    @IsNotEmpty()
    imageUrl: string
}

export class UploadQuestionImageDto {
    
    @ApiProperty({
        description: "image for question id",
        type: Number,
        example: 0
    })
    readonly questionId: number
}

export class UploadQuestionImageResponseDto {

    @ApiProperty({
        description: "image url of the user",
        type: String,
        example: "41f0d303-9c68-41e2-9f5e-3aed60906128.png"
    })
    @IsString()
    @IsNotEmpty()
    imageUrl: string

    @ApiProperty({
        description: "image for question id",
        type: Number,
        example: 0
    })
    @IsNotEmpty()
    @IsNumber()
    questionId: number
}