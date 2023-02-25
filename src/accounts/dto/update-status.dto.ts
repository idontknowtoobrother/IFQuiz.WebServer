import { IsOptional, IsString } from "class-validator";


export class UpdateStatusDto {

    @IsOptional()
    @IsString()
    readonly status: string

}