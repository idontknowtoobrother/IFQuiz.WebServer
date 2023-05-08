import { Prop } from "@nestjs/mongoose";

export class ScoreDto {

    @Prop({ required: true})
    score : number

}