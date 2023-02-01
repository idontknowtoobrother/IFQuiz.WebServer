import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class User {    
    
    @Prop({unique:[true, 'Duplicate email entered!']})
    email: string

    @Prop()
    password: string

    @Prop()
    fullname: string

    @Prop()
    status: string

    @Prop()
    birthday : Date
}

export const UserSchema = SchemaFactory.createForClass(User);