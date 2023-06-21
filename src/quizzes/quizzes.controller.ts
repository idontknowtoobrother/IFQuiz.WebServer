import { Body, Controller, Param, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Delete, Get, Post, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizzesService } from './quizzes.service';
import { Quizzes } from './schemas/created.quizzes.schema';
import { Query as ExpressQuery } from 'express-serve-static-core'
import { AuthGuard } from '@nestjs/passport';
import { DeployedQuizzes } from './schemas/deployed.quizzes.schema';
import { query } from 'express';
import { RunningQuizzes } from './schemas/running.quizzes.schema';
import { Response } from 'express';


@Controller('quizzes')
export class QuizzesController {
    constructor(private quizzesService: QuizzesService) { }

    @Get() // get all quizzes
    @UseGuards(AuthGuard())
    async getQuizzes(
        @Query()
        query: ExpressQuery,
        @Req()
        req
    ): Promise<Quizzes[]> {
        return this.quizzesService.getAll(query, req.user._id)
    }


    @Get('/take')
    @UseGuards(AuthGuard())
    async takeQuiz(
        @Query()
        query: ExpressQuery,
        @Req()
        req,
        @Res()
        res: Response
    ): Promise<RunningQuizzes | Response>{
        return this.quizzesService.takeQuiz(req.user._id, res, query)
    }


    @Get('/deployed') // get all deployed quizzes
    @UseGuards(AuthGuard())
    async getDeployedQuizzes(
        @Query()
        query: ExpressQuery
    ): Promise<DeployedQuizzes[] | DeployedQuizzes> {
        return this.quizzesService.getAllDeployed(query)
    }

    @Get('/running')
    @UseGuards(AuthGuard())
    async getRunningQuizzes(
        @Req()
        req,
    ):Promise<RunningQuizzes[]>{
        return this.quizzesService.getRunningQuizzes(req.user._id)
    }



    @Get(':id') // get edit quiz by id
    @UseGuards(AuthGuard())
    async getEditQuiz(
        @Req()
        req,
        @Param('id')
        id: string
    ): Promise<Quizzes> {
        return this.quizzesService.getEditQuiz(id, req.user._id)
    }


    @Post('/take/update-answer')
    @UseGuards(AuthGuard())
    async updateAnswer(
        @Req()
        req,
        @Res()
        res: Response,
        @Body()
        body: any
    ): Promise<RunningQuizzes | Response>{
        return this.quizzesService.updateAnswer(req.user._id, body, res)
    }

    @Post('/create') // create quiz
    @UseGuards(AuthGuard())
    async createQuiz(
        @Body()
        createQuizDto: CreateQuizDto,
        @Req()
        req
    ): Promise<Quizzes> {
        if (createQuizDto._id) {
            return this.quizzesService.updateByUser(createQuizDto._id, createQuizDto, req.user._id)
        }
        return this.quizzesService.create(createQuizDto, req.user)
    }

    @Post('/deploy') // deploy quiz
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
        req,
        @Res()
        res: Response
    ): Promise<Response> {
        return this.quizzesService.deleteByUser(id, req.user._id, res)
    }

}
