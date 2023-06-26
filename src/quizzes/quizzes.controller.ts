import { Body, Controller, HttpStatus, Param, Query, Req, Res, UseGuards } from '@nestjs/common';
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
import { CompletedQuizzes } from './schemas/completed.quizzes.schema';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UpdateAnswersDto } from './dto/update.answer.dto';


@ApiTags('Quizzes')
@ApiBearerAuth()
@Controller('quizzes')
export class QuizzesController {
    constructor(private quizzesService: QuizzesService) { }

    @Get() // get all quizzes
    @UseGuards(AuthGuard())
    @ApiCreatedResponse({
        description: 'Get all quizzes',
        type: [Quizzes]
    })
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
    @ApiCreatedResponse({
        description: 'Take quiz',
        type: RunningQuizzes
    })
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


    @Get('/completed')
    @UseGuards(AuthGuard())
    @ApiCreatedResponse({
        description: 'Get completed quizzes',
        type: [CompletedQuizzes]
    })
    async getCompletedQuizzes(
        @Query()
        query: ExpressQuery,
        @Req()
        req,
    ): Promise<CompletedQuizzes[]>{
        return this.quizzesService.getCompletedQuizzes(req.user._id, query)
    }


    @Get('/deployed') // get all deployed quizzes
    @UseGuards(AuthGuard())
    @ApiCreatedResponse({
        description: 'Get all deployed quizzes',
        type: [DeployedQuizzes]
    })
    async getDeployedQuizzes(
        @Query()
        query: ExpressQuery
    ): Promise<DeployedQuizzes[] | DeployedQuizzes> {
        return this.quizzesService.getAllDeployed(query)
    }

    @Get('/running')
    @UseGuards(AuthGuard())
    @ApiCreatedResponse({
        description: 'Get running quizzes',
        type: [RunningQuizzes]
    })
    async getRunningQuizzes(
        @Req()
        req,
    ):Promise<RunningQuizzes[]>{
        return this.quizzesService.getRunningQuizzes(req.user._id)
    }


    @Get(':id') // get edit quiz by id
    @UseGuards(AuthGuard())
    @ApiCreatedResponse({
        description: 'Get edit quiz by id',
        type: Quizzes
    })
    async getEditQuiz(
        @Req()
        req,
        @Param('id')
        id: string
    ): Promise<Quizzes> {
        return this.quizzesService.getEditQuiz(id, req.user._id)
    }


    @Post('/take/submit')
    @UseGuards(AuthGuard())
    @ApiCreatedResponse({
        description: 'Submit quiz',
        type: CompletedQuizzes
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                quizId: {
                    type: 'string',
                    description: 'Quiz id of running quiz',
                    example: '60f0b0b0e3b3c3b3b0b3b0b3'
                },
            }
        }
    })
    async submitQuiz(
        @Req()
        req,
        @Res({passthrough: true})
        res: Response,
        @Body()
        body: any
    ): Promise<CompletedQuizzes | Response>{
        const {quizId} = body
        if(!quizId) {
            res.status(HttpStatus.NOT_FOUND).json({message: 'quizId is required'})
            return
        }
        return this.quizzesService.submitQuiz(req.user._id, quizId, res)
    }

    @Post('/take/update-answer')
    @UseGuards(AuthGuard())
    @ApiCreatedResponse({
        description: 'Update answer',
        type: RunningQuizzes
    })
    async updateAnswer(
        @Req()
        req,
        @Res()
        res: Response,
        @Body()
        body: UpdateAnswersDto
    ): Promise<RunningQuizzes | Response>{
        return this.quizzesService.updateAnswer(req.user._id, body, res)
    }

    @Post('/create') // create quiz
    @UseGuards(AuthGuard())
    @ApiCreatedResponse({
        description: 'Create quiz',
        type: Quizzes
    })
    @ApiBody({
        type: CreateQuizDto
    })
    async createQuiz(
        @Body()
        createQuizDto: CreateQuizDto,
        @Req()
        req
    ): Promise<Quizzes> {
        return this.quizzesService.create(createQuizDto, req.user)
    }

    @Post('/deploy') // deploy quiz
    @UseGuards(AuthGuard())
    @ApiCreatedResponse({
        description: 'Deploy quiz',
        type: DeployedQuizzes
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                quizId: {
                    type: 'string',
                    description: 'Quiz id',
                    example: '60f0b0b0e3b3c3b3b0b3b0b3'
                },
            }
        }
    })
    async deployQuiz(
        @Body()
        body,
        @Req()
        req
    ): Promise<DeployedQuizzes> {
        const { quizId } = body
        return this.quizzesService.deploy(quizId, req.user._id)
    }

    @ApiCreatedResponse({
        description: 'Update quiz',
        type: Quizzes
    })
    @ApiBody({
        type: UpdateQuizDto
    })
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

    @ApiCreatedResponse({
        description: 'Delete quiz',
        schema: {
            example: {
                "message": "Quiz deleted successfully"
            }
        }
    })
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


