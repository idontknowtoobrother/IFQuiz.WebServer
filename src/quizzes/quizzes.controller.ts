import { Body, Controller, Param, Query, Req, UseGuards } from '@nestjs/common';
import { Delete, Get, Post, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizzesService } from './quizzes.service';
import { Quizzes } from './schemas/quizzes.schema';

import { Query as ExpressQuery } from 'express-serve-static-core'
import { AuthGuard } from '@nestjs/passport';
import { DeployedQuizzes } from './schemas/deployed-quizzes.schema';

@Controller('quizzes')
export class QuizzesController {
    constructor(private quizzesService: QuizzesService){}

    @Get() // get all quizzes
    @UseGuards(AuthGuard())
    async getQuizzes(
        @Query()
        query : ExpressQuery,
        @Req()
        req
    ): Promise<Quizzes[]> {
        return this.quizzesService.getAll(query, req.user._id)
    }

    @Get(':id') // get quiz by id
    @UseGuards(AuthGuard())
    async getQuiz(
        @Req()
        req,
        @Param('id')
        id: string
    ): Promise<Quizzes> {
        return this.quizzesService.get(id, req.user._id)
    }

    @Post('/create') // create quiz
    @UseGuards(AuthGuard())
    async createQuiz(
        @Body() 
        createQuizDto: CreateQuizDto,
        @Req()
        req
    ): Promise<Quizzes> {
        if(createQuizDto._id){
            return this.quizzesService.updateByUser(createQuizDto._id, createQuizDto, req.user._id)
        }
        return this.quizzesService.create(createQuizDto, req.user)
    }

    @Post('/deploy')
    @UseGuards(AuthGuard())
    async deployQuiz(
        @Body()
        body,
        @Req()
        req
    ): Promise<DeployedQuizzes> {
        const { quizId } = body
        return this.quizzesService.deploy(quizId, req.user._id)
    }

    @Put(':id') // update quiz
    @UseGuards(AuthGuard())
    async updateQuiz(
        @Param('id')
        id: string,
        @Body()
        quizDto: UpdateQuizDto,
        @Req()
        req
    ): Promise<Quizzes> {
        return this.quizzesService.updateByUser(id, quizDto, req.user._id)
    }

    @Delete(':id') // delete quiz
    @UseGuards(AuthGuard())
    async deleteQuiz(
        @Param('id')
        id: string,
        @Req()
        req
    ): Promise<string> {
        return this.quizzesService.deleteByUser(id, req.user._id)
    }

}
