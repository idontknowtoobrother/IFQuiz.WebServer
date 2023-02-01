import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export enum Category {
    MATH = 'Mathematics',
    SCIENCE = 'Science',
}

@Schema({ timestamps: true })
export class Quizzes {

    @Prop({ require: true })
    name : string

    @Prop({ required: true})
    description : string

    @Prop({required: true})
    category : Category


    // @ TODO MORE
    // Question : Object

}

export const QuizzesSchema = SchemaFactory.createForClass(Quizzes)