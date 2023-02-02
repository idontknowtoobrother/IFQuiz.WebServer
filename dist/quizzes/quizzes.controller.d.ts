import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizzesService } from './quizzes.service';
import { Quizzes } from './schemas/quizzes.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';
export declare class QuizzesController {
    private quizzesService;
    constructor(quizzesService: QuizzesService);
    getQuizzes(query: ExpressQuery): Promise<Quizzes[]>;
    getQuiz(id: string): Promise<Quizzes>;
    createQuiz(createQuizDto: CreateQuizDto, req: any): Promise<Quizzes>;
    updateQuiz(id: string, quizDto: UpdateQuizDto, req: any): Promise<Quizzes>;
    deleteQuiz(id: string, req: any): Promise<string>;
}
