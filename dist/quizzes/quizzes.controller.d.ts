import { CreateQuizDto } from './dto/createquiz.dto';
import { QuizzesService } from './quizzes.service';
import { Quizzes } from './schemas/quizzes.schema';
export declare class QuizzesController {
    private quizzesService;
    constructor(quizzesService: QuizzesService);
    getAllQuizzes(): Promise<Quizzes[]>;
    getQuiz(id: string): Promise<Quizzes>;
    createQuiz(createQuizDto: CreateQuizDto): Promise<Quizzes>;
}
