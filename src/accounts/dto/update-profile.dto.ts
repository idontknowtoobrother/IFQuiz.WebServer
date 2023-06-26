import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, IsUrl, Min, MinLength } from "class-validator";

export class UpdateProfileDto {
    
    @ApiProperty({
        description: "status of the user",
        type: String,
        example: "I am a student"
    })
    @IsOptional()
    @IsString()
    readonly status: string

    @ApiProperty({
        description: "full name of the user",
        type: String,
        example: "John Doe"
    })
    @IsOptional()
    @IsString()
    @MinLength(8)
    readonly fullname: string

}