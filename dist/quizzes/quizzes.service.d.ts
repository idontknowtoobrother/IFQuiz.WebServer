import { Model } from 'mongoose';
import { Quizzes } from './schemas/quizzes.schema';
export declare class QuizzesService {
    private quizzesModel;
    constructor(quizzesModel: Model<Quizzes>);
    getAll(): Promise<Quizzes[]>;
    get(id: string): Promise<Quizzes>;
    create(newQuiz: Quizzes): Promise<Quizzes>;
    delete(id: string): Promise<string>;
    put(id: string, updateQuiz: Quizzes): Promise<Quizzes>;
}
