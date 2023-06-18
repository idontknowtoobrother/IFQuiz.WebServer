export function getQuizzesWithOutCorrectAnswer(quizzes: any){
    let quizzesFinal = quizzes

    for(let quiz of quizzesFinal){
        for(let question of quiz.questions){
            for(let ans of question.answer){
                delete ans?.checked
                delete ans?.type
                delete ans?.matchString
            }
        }
    }

    return quizzesFinal
}

export function getQuizWithOutCorrectAnswer(quiz: any){
    let quizFinal = quiz

    for(let question of quizFinal.questions){
        for(let ans of question.answer){
            delete ans?.checked
            delete ans?.type
            delete ans?.matchString
        }
    }

    return quizFinal
}