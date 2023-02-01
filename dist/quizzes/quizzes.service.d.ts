import { Model } from 'mongoose';
import { Quizzes } from './schemas/quizzes.schema';
export declare class QuizzesService {
    private quizzesModel;
    constructor(quizzesModel: Model<Quizzes>);
    findAll(): Promise<Quizzes[]>;
    findOne(id: string): Promise<Quizzes>;
}
