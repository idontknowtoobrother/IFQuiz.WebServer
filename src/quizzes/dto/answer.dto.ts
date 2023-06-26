import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

export enum FillTypes {
    IS_EXACTLY = 'is-exactly',
    CONTAINS = 'contains'
}

export class SingleAnswer {

    @ApiProperty({
        description: 'explaination text',
        type: String,
        example: 'explaination text'
    })
    @Prop({required: true})
    @IsNotEmpty()
    @IsString()
    readonly explain: string

    @ApiProperty({
        description: 'Is correct answer',
        type: Boolean,
        example: true
    })
    @Prop({required: true})
    @IsNotEmpty()
    @IsBoolean()
    readonly checked: boolean
} 

export class MultipleAnswer {

    @ApiProperty({
        description: 'explaination text',
        type: String,
        example: 'explaination text'
    })
    @Prop({required: true})
    @IsNotEmpty()
    @IsString()
    readonly explain: string

    @ApiProperty({
        description: 'Is correct answer',
        type: Boolean,
        example: true
    })
    @Prop({required: true})
    @IsNotEmpty()
    @IsBoolean()
    readonly checked: boolean

}

export class FillAnswer {

    @ApiProperty({
        description: 'fill correct answer type',
        type: String,
        example: 'is-exactly'
    })
    @Prop({required: true})
    @IsNotEmpty()
    @IsString()
    readonly type: FillTypes

    @ApiProperty({
        description: 'fill correct answer match string',
        type: String,
        example: 'match string'
    })
    @Prop({required: true})
    @IsNotEmpty()
    @IsString()
    readonly matchString: string
    
}