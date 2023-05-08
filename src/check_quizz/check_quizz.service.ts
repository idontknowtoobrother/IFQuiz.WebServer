import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CheckQuizz } from './schemas/check_quizz.schema';
import { QuizzAnswerDto } from './dto/quiz_answer.dto';
import { ScoreDto } from './dto/score.dto';
import { Quizzes } from '../quizzes/schemas/quizzes.schema';

@Injectable()
export class CheckQuizzService {
    constructor(
        @InjectModel(CheckQuizz.name)
        private checkQuizzModel: Model<CheckQuizz>,
        @InjectModel(Quizzes.name)
        private quizzesModel: Model<Quizzes>
    ){}

    async checkQuizz(userId: string, quizzAnswer: QuizzAnswerDto): Promise<ScoreDto> {
        const { userAnswer, roomInformation } = quizzAnswer
        const { _id, questions } = roomInformation
        const quiz = await this.quizzesModel.findById(_id)
        if(!quiz) throw new NotFoundException('Quiz not found!')
        let score = 0
        for(let i = 0; i < questions.length; i++){
            const question = questions[i]
            
            if (question.type == 'single-choice'){
                if(question.answer.correctAnswer === userAnswer[i]){
                    score += question.points
                }
                continue;
            }

            if(question.type == 'multiple-choice'){
                let scorediff = question.answer.correctAnswer.length
                for(let j = 0; j < question.answer.correctAnswer.length; j++){
                    if(question.answer.correctAnswer.includes(userAnswer[i][j])){
                        scorediff -= 1
                    }
                }
                if(scorediff <= 0){
                    score += question.points
                }
                continue;
            }

            if(question.type == 'fill-choice'){
                for(const correctAnswer of question.answer.correctAnswer){
                    if (correctAnswer.type == 'is-exactly'){
                        const correctAnswerString = correctAnswer.matchString.join(' ')
                        if(userAnswer[i] == correctAnswerString){
                            score += question.points
                            break;
                        }
                        continue;
                    }

                    if(correctAnswer.type == 'contains'){
                        if(correctAnswer.matchString.includes(userAnswer[i])){
                            score += question.points
                            break;
                        }
                        continue;
                    }
                }
                continue;
            }
           
        }


        const checkedQuizz = {
            quiz: quizzAnswer,
            score: score
        }
        const data = Object.assign(checkedQuizz, {user: userId})
    
        const reponse = await this.checkQuizzModel.create(data)

        return reponse
    }

}
