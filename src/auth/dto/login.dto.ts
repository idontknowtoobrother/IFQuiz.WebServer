import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {

    @ApiProperty({
        description: "email of the user",
        type: String,
        example: "example@gmail.com"
    })
    @IsNotEmpty()
    @IsEmail({}, {message: "Incorrect Email"})
    readonly email: string

    @ApiProperty({
        description: "password of the user",
        type: String,
        example: "password123"
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    readonly password: string

}

