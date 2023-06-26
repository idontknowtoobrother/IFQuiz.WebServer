import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class Duration {
    @ApiProperty({
        description: 'Hours',
        type: Number,
        example: 1
    })
    @IsNumber()
    @IsNotEmpty()
    readonly hours: number

    @ApiProperty({
        description: 'Minutes',
        type: Number,
        example: 30
    })
    @IsNumber()
    @IsNotEmpty()
    readonly minutes: number
}