import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

// @F1 : import document make u easy don't have to add _id field to class User
import { Document } from 'mongoose'

@Schema({
    timestamps: true
})
export class User extends Document {    // @F1 : extends it by Document
    
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

    @Prop({default: null})
    profileImage : string

}

export const UserSchema = SchemaFactory.createForClass(User);