import { QuizzesService } from './quizzes.service';
import { Quizzes } from './schemas/quizzes.schema';
export declare class QuizzesController {
    private quizzesService;
    constructor(quizzesService: QuizzesService);
    getAllQuizzes(): Promise<Quizzes[]>;
}
