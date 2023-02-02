import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizzesService } from './quizzes.service';
import { Quizzes } from './schemas/quizzes.schema';
export declare class QuizzesController {
    private quizzesService;
    constructor(quizzesService: QuizzesService);
    getQuizzes(): Promise<Quizzes[]>;
    getQuiz(id: string): Promise<Quizzes>;
    createQuiz(createQuizDto: CreateQuizDto): Promise<Quizzes>;
    updateQuiz(id: string, quizDto: UpdateQuizDto): Promise<Quizzes>;
    deleteQuiz(id: string): Promise<string>;
}
