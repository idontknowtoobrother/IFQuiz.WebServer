/// <reference types="mongoose/types/pipelinestage" />
import { Document } from 'mongoose';
export declare class User extends Document {
    email: string;
    password: string;
    fullname: string;
    status: string;
    birthday: Date;
    profileImage: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any>, any, any>;
