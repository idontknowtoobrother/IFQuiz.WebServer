import mongoose from "mongoose";
import { User } from "../../auth/schemas/user.schema";
import { QuestionDto } from "../dto/question.dto";
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
    questions: QuestionDto[];
}
export declare const QuizzesSchema: mongoose.Schema<Quizzes, mongoose.Model<Quizzes, any, any, any>, any, any>;
