import { Body, Controller, Param } from '@nestjs/common';
import { Get, Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { CreateQuizDto } from './dto/createquiz.dto';
import { QuizzesService } from './quizzes.service';
import { Quizzes } from './schemas/quizzes.schema';

@Controller('quizzes')
export class QuizzesController {
    constructor(private quizzesService: QuizzesService){}

    @Get() // get all quizzes
    async getAllQuizzes(): Promise<Quizzes[]> {
        return this.quizzesService.getAll()
    }

    @Get(':id') // get quiz by id
    async getQuiz(
        @Param('id')
        id: string
    ): Promise<Quizzes>{
        return this.quizzesService.get(id)
    }

    @Post('/create') // create quiz
    async createQuiz(
        @Body() 
        createQuizDto: CreateQuizDto,
    ): Promise<Quizzes>{
        return this.quizzesService.create(createQuizDto)
    }
}
