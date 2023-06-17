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
        private checkQuizzModel: Model<CheckQuizz>
    ){}

    // async checkQuizz(userId: string, quizzAnswer: QuizzAnswerDto): Promise<ScoreDto> {
    //     const { userAnswers, roomInformation } = quizzAnswer
    //     const saveUserAnswer = userAnswers as []
    //     const { questions } = roomInformation
    //     let score = 0
    //     for(let i = 0; i < questions.length; i++){
    //         const question = questions[i]
            
    //         if (question.type == 'single-choice'){
    //             if(question.answer.correctAnswer === userAnswers[i]){
    //                 score += question.points
    //             }
    //             continue;
    //         }

    //         if(question.type == 'multiple-choice'){
    //             let currAns = userAnswers[i] as []
    //             let userCorrectLength = 0
    //             for(const correctAns of question.answer.correctAnswer) {
    //                 for(let indexCurrAns = 0; indexCurrAns < currAns.length; indexCurrAns++){
    //                     if(correctAns === currAns[indexCurrAns]){
    //                         userCorrectLength++
    //                         break;
    //                     }
    //                 }
    //             } 
    //             if(userCorrectLength == question.answer.correctAnswer.length){
    //                 score += question.points
    //             }
    //             continue;
    //         }

    //         if(question.type == 'fill-choice'){
    //             for(const correctAnswer of question.answer.correctAnswer){
    //                 if (correctAnswer.type == 'is-exactly'){
    //                     const correctAnswerString = correctAnswer.matchString.join(' ')
    //                     if(userAnswers[i] == correctAnswerString){
    //                         score += question.points
    //                         break;
    //                     }
    //                     continue;
    //                 }

    //                 if(correctAnswer.type == 'contains'){
    //                     if(correctAnswer.matchString.includes(userAnswers[i])){
    //                         score += question.points
    //                         break;
    //                     }
    //                     continue;
    //                 }
    //             }
    //             continue;
    //         }
           
    //     }

    //     const checkedQuizz = {
    //         quiz: quizzAnswer.roomInformation,
    //         userAnswers: saveUserAnswer,
    //         score: score
    //     }
    //     const data = Object.assign(checkedQuizz, {user: userId})
    //     const reponse = await this.checkQuizzModel.create(data)
    //     return reponse
    // }

}
