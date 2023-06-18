import { IsNotEmpty, IsString } from "class-validator";

export class UploadQuizCoverImageDto {

    @IsNotEmpty()
    @IsString()
    quizId: string
}