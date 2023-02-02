import { Model } from 'mongoose';
import { Quizzes } from './schemas/quizzes.schema';
import { Query } from 'express-serve-static-core';
export declare class QuizzesService {
    private quizzesModel;
    constructor(quizzesModel: Model<Quizzes>);
    getAll(query: Query): Promise<Quizzes[]>;
    get(id: string): Promise<Quizzes>;
    create(newQuiz: Quizzes): Promise<Quizzes>;
    delete(id: string): Promise<string>;
    put(id: string, updateQuiz: Quizzes): Promise<Quizzes>;
}
