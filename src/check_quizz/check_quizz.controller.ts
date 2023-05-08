import { Body, Controller, Param, Query, Req, UseGuards } from '@nestjs/common';
import { Delete, Get, Post, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { CheckQuizzService } from './check_quizz.service';
// import { CreateQuizDto } from './dto/create-quiz.dto';
// import { UpdateQuizDto } from './dto/update-quiz.dto';
// import { Quizzes } from './schemas/check_quizz.schema';
// import { Query as ExpressQuery } from 'express-serve-static-core'
// import { AuthGuard } from '@nestjs/passport';

@Controller('check_quizz')
export class CheckQuizzController {
    constructor(private quizzesService: CheckQuizzService){}

    // @Get() // get all quizzes
    // async getQuizzes(
    //     @Query()
    //     query : ExpressQuery
    // ): Promise<Quizzes[]> {
    //     return this.quizzesService.getAll(query)
    // }

    // @Get(':id') // get quiz by id
    // async getQuiz(
    //     @Param('id')
    //     id: string
    // ): Promise<Quizzes> {
    //     return this.quizzesService.get(id)
    // }

    // @Post('/create') // create quiz
    // @UseGuards(AuthGuard())
    // async createQuiz(
    //     @Body() 
    //     createQuizDto: CreateQuizDto,
    //     @Req()
    //     req
    // ): Promise<Quizzes> {
    //     return this.quizzesService.create(createQuizDto, req.user)
    // }

    // @Put(':id') // update quiz
    // @UseGuards(AuthGuard())
    // async updateQuiz(
    //     @Param('id')
    //     id: string,
    //     @Body()
    //     quizDto: UpdateQuizDto,
    //     @Req()
    //     req
    // ): Promise<Quizzes> {
    //     return this.quizzesService.updateByUser(id, quizDto, req.user._id)
    // }

    // @Delete(':id') // delete quiz
    // @UseGuards(AuthGuard())
    // async deleteQuiz(
    //     @Param('id')
    //     id: string,
    //     @Req()
    //     req
    // ): Promise<string> {
    //     return this.quizzesService.deleteByUser(id, req.user._id)
    // }

}
