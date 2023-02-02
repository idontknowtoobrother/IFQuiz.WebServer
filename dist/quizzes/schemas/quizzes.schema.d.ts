import mongoose from "mongoose";
import { User } from "../../auth/schemas/user.schema";
export declare enum Category {
    MATH = "Mathematics",
    SCIENCE = "Science",
    ENG = "English Language",
    COMSCI = "Computer Science",
    PE = "Physical Education",
    ART = "Creative Arts",
    LANGUAGE = "World Language"
}
export declare class Quizzes {
    name: string;
    description: string;
    category: Category;
    user: User;
}
export declare const QuizzesSchema: mongoose.Schema<Quizzes, mongoose.Model<Quizzes, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Quizzes>;
