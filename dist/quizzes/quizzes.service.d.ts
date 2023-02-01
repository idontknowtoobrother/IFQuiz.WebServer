import { Model } from 'mongoose';
import { CreateQuizDto } from './dto/createquiz.dto';
import { Quizzes } from './schemas/quizzes.schema';
export declare class QuizzesService {
    private quizzesModel;
    constructor(quizzesModel: Model<Quizzes>);
    getAll(): Promise<Quizzes[]>;
    get(id: string): Promise<Quizzes>;
    create(quizDto: CreateQuizDto): Promise<Quizzes>;
}
