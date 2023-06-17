import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { Prop } from "@nestjs/mongoose";

export enum FillTypes {
    IS_EXACTLY = 'is-exactly',
    CONTAINS = 'contains'
}

export class SingleAnswer {

    @Prop({required: true})
    @IsNotEmpty()
    @IsString()
    readonly explain: string

    @Prop({required: true})
    @IsNotEmpty()
    @IsBoolean()
    readonly checked: boolean
} 

export class MultipleAnswer {

    @Prop({required: true})
    @IsNotEmpty()
    @IsString()
    readonly explain: string

    @Prop({required: true})
    @IsNotEmpty()
    @IsBoolean()
    readonly checked: boolean

}

export class FillAnswer {

    @Prop({required: true})
    @IsNotEmpty()
    @IsString()
    readonly type: FillTypes

    @Prop({required: true})
    @IsNotEmpty()
    @IsString()
    readonly matchString: string
    
}