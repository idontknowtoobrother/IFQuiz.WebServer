import { Body, Controller, Param, Query, Req, UseGuards } from '@nestjs/common';
import { Delete, Get, Post, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { CheckQuizzService } from './check_quizz.service';
import { AuthGuard } from '@nestjs/passport';
import { QuizzAnswerDto } from './dto/quiz_answer.dto';
import { ScoreDto } from './dto/score.dto';

@Controller('check_quizz')
export class CheckQuizzController {
    constructor(private checkQuizzService: CheckQuizzService){}

    @Post()
    @UseGuards(AuthGuard())
    async checkQuizz(
        @Body()
        quizzAnswer : QuizzAnswerDto,
        @Req()
        req
    ): Promise<ScoreDto>{
        return this.checkQuizzService.checkQuizz(req.user._id, quizzAnswer)
    }

}
