import { IsNotEmpty, IsNumber } from "class-validator";

export class Duration {
    @IsNumber()
    @IsNotEmpty()
    readonly hours: number

    @IsNumber()
    @IsNotEmpty()
    readonly minutes: number
}