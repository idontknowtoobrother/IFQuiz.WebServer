import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsStrongPassword } from "class-validator";

export class ChangePasswordDto {

    @ApiProperty({
        description: "new password of the user",
        type: String,
        example: "newPassword123"
    })
    @IsNotEmpty()
    @IsStrongPassword()
    readonly password: string

}