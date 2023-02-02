import { Body, Controller, Param } from '@nestjs/common';
import { Delete, Get, Post, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizzesService } from './quizzes.service';
import { Quizzes } from './schemas/quizzes.schema';

@Controller('quizzes')
export class QuizzesController {
    constructor(private quizzesService: QuizzesService){}

    @Get() // get all quizzes
    async getQuizzes(): Promise<Quizzes[]> {
        return this.quizzesService.getAll()
    }

    @Get(':id') // get quiz by id
    async getQuiz(
        @Param('id')
        id: string
    ): Promise<Quizzes> {
        return this.quizzesService.get(id)
    }

    @Post('/create') // create quiz
    async createQuiz(
        @Body() 
        createQuizDto: CreateQuizDto,
    ): Promise<Quizzes> {
        return this.quizzesService.create(createQuizDto)
    }

    @Put(':id') // update quiz
    async updateQuiz(
        @Param('id')
        id: string,
        @Body()
        quizDto: UpdateQuizDto
    ): Promise<Quizzes> {
        return this.quizzesService.put(id, quizDto)
    }

    @Delete(':id') // delete quiz
    async deleteQuiz(
        @Param('id')
        id: string
    ): Promise<string> {
        return this.quizzesService.delete(id)
    }

}
