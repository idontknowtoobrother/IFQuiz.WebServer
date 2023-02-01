import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { QuizzesService } from './quizzes.service';
import { Quizzes } from './schemas/quizzes.schema';

@Controller('quizzes')
export class QuizzesController {
    constructor(private quizzesService: QuizzesService){}

    @Get() // get all book
    async getAllQuizzes(): Promise<Quizzes[]> {
        return this.quizzesService.findAll()
    }
}
