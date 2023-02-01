import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class User {    
    
    @Prop({required: true, unique: true})
    email: string

    @Prop({required: true})
    password: string

    @Prop({required: true})
    fullname: string

    @Prop({default: "🤔 What you thinking ?"})
    status: string

    @Prop({required: true})
    birthday : Date
}

export const UserSchema = SchemaFactory.createForClass(User);