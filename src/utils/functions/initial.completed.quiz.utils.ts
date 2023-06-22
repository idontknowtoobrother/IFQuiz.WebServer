import { Logger } from '@nestjs/common';
import { FillAnswer } from 'src/quizzes/dto/answer.dto';
import { QuestionDto } from "src/quizzes/dto/question.dto";
import { CompletedQuizzes } from "src/quizzes/schemas/completed.quizzes.schema";
import { RunningQuizzes } from "src/quizzes/schemas/running.quizzes.schema";

const logger = new Logger('CheckAnswer')


// helper function FillChoice (chat-gpt3)
function isAnswerCorrect(correctAnswer: any, answer: string): boolean {
    for (const answerData of correctAnswer) {
        if (answerData.type === 'is-exactly') {
            if (answer === answerData.matchString) {
                return true;
            }
        }
        if (answerData.type === 'contains') {
            if(answer!== null && answer !== undefined){
                const words = answer.split(' ');
                if (words.includes(answerData.matchString)) {
                    return true;
                }
            }
        }
    }
    return false;
}
// helper function FillChoice (chat-gpt3)


const checkFillChoice = (question: QuestionDto, answer: any) => {
    const correctAnswer = question.answer
    const isCorrect = isAnswerCorrect(correctAnswer, answer.matchString)
    logger.debug(`\nCHECK_FILL_CHOICE: correctAnswer: ${JSON.stringify(correctAnswer)} answer: ${answer.matchString} add-points: ${isCorrect ? question.points : 0}`)
    return isCorrect ? question.points : 0
}

// helper function MultipleChoice (chat-gpt3)
function checkMatchingIds(correctIds: number[], answerIds: number[]): boolean {
    if (!answerIds || answerIds.length === 0) {
        return false;
    }

    const sortedCorrectIds = correctIds.sort();
    const sortedAnswerIds = answerIds.sort();

    return sortedCorrectIds.some((correctId) => sortedAnswerIds.includes(correctId));
}
// helper function MultipleChoice (chat-gpt3)

const checkMultipleChoice = (question: QuestionDto, answer: any) => {
    const correctIds = question.answer.map((item, index) => ((item as any).checked ? index : null))
        .filter((index) => index !== null);

    const isCorrect = checkMatchingIds(correctIds, answer.selectedIds);
    logger.debug(`\nCHECK_MULTIPLE_CHOICE: correctIds: ${JSON.stringify(correctIds)} answerIds: ${JSON.stringify(answer.selectedIds)} add-points: ${isCorrect ? question.points : 0}`)
    return isCorrect ? question.points : 0
}

const checkSingleChoice = (question: QuestionDto, answer: any) => {
    const correctId = question.answer.findIndex((ans) => (ans as any).checked)
    const isCorrect = correctId === answer.selectedId
    logger.debug(`\nCHECK_SINGLE_CHOICE: correctId: ${correctId} answerId: ${answer.selectedId} add-points: ${isCorrect ? question.points : 0}}`)
    return isCorrect ? question.points : 0
}

const checkAnswerMaps: Object = {
    'single-choice': checkSingleChoice,
    'fill-choice': checkFillChoice,
    'multiple-choice': checkMultipleChoice
}



export function checkQuizCompleted(quizzes: RunningQuizzes[]) {
    const completedQuizzes: CompletedQuizzes[]= [];

    for (const quiz of quizzes) {
        const checkedQuiz: any = {};
        checkedQuiz._id = null;
        checkedQuiz.score = 0;

        // Check if the required properties exist in the quiz object
        if (quiz.user && quiz.questions && quiz.copyof && quiz.expiredAt && quiz.answers && quiz.selectedQuestionId) {
            // Copy the properties from the original quiz to the checkedQuiz
            checkedQuiz.user = quiz.user;
            checkedQuiz.questions = quiz.questions;
            checkedQuiz.copyof = quiz.copyof;
            checkedQuiz.expiredAt = quiz.expiredAt;
            checkedQuiz.answers = quiz.answers;
            checkedQuiz.selectedQuestionId = quiz.selectedQuestionId;
        } else {
            // Handle the case when the required properties are not defined
            logger.error('Required properties are missing in the quiz object:', quiz);
            continue; // Skip processing this quiz and move to the next one
        }

        // Calculate the score based on the question and answers
        for (let id = 0; id < quiz.questions.length; id++) {
            const question = quiz.questions[id];
            const answers = quiz.answers[id];
            checkedQuiz.score += checkAnswerMaps[question.type](question, answers);
        }

        completedQuizzes.push(checkedQuiz);
    }

    console.log(completedQuizzes);
    return completedQuizzes;
}