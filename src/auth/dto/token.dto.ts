import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class TokenDto {

    @ApiProperty({
        description: "token of the user",
        type: String,
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    })
    @IsString()
    @IsNotEmpty()
    readonly token: string
}