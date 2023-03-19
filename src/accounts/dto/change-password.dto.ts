import { IsNotEmpty, IsStrongPassword } from "class-validator";

export class ChangePasswordDto {

    @IsNotEmpty()
    @IsStrongPassword()
    readonly password: string

}