import { IsOptional, IsString, IsUrl, Min, MinLength } from "class-validator";

export class UpdateProfileDto {
    
    @IsOptional()
    @IsString()
    readonly status: string

    @IsOptional()
    @IsString()
    @MinLength(8)
    readonly fullname: string

}