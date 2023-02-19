import { IsDate, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class SignUpDto {

    @IsNotEmpty()
    @IsEmail({}, {message: "Incorrect Email"})
    readonly email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    readonly password: string

    @IsNotEmpty()
    @IsString()
    readonly fullname: string

    @IsNotEmpty()
    // @IsDate()
    readonly birthday: Date

}
