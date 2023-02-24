import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateProfileDto {
    
    @IsOptional()
    @IsEmail()
    readonly email: string

    @IsOptional()
    @IsString()
    readonly status: string

}