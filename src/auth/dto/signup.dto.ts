import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class SignUpDto {

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

    @ApiProperty({
        description: "full name of the user",
        type: String,
        example: "John Doe"
    })
    @IsNotEmpty()
    @IsString()
    readonly fullname: string

    @ApiProperty({
        description: "birthday of the user",
        type: Date,
    })
    @IsNotEmpty()
    // @IsDate()
    readonly birthday: Date

}
