import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class UpdateStatusDto {

    @ApiProperty({
        description: "Status of the user",
        type: String,
        example: "I am a student"
    })
    @IsOptional()
    @IsString()
    readonly status: string

}