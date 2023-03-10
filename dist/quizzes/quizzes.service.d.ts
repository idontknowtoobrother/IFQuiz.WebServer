import { Model } from 'mongoose';
import { Quizzes } from './schemas/quizzes.schema';
import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';
export declare class QuizzesService {
    private quizzesModel;
    constructor(quizzesModel: Model<Quizzes>);
    getAll(query: Query): Promise<Quizzes[]>;
    get(id: string): Promise<Quizzes>;
    create(newQuiz: Quizzes, user: User): Promise<Quizzes>;
    deleteByUser(id: string, userId: string): Promise<string>;
    updateByUser(id: string, updateQuiz: Quizzes, userId: string): Promise<Quizzes>;
}
