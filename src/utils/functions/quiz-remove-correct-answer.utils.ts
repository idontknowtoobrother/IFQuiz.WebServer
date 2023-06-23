import { RunningQuizzes } from "src/quizzes/schemas/running.quizzes.schema"

export function getCompletedQuizzesWithOutCorrectAnswer(quizzes: any){
    let quizzesFinal = quizzes

    for(let quiz of quizzesFinal){
        if(quiz.hideCorrectAnswer){
            for(let question of quiz.questions){
                for(let ans of question.answer){
                    delete ans?.checked
                    delete ans?.type
                    delete ans?.matchString
                }
            }
            if(quiz.copyof !== null && quiz.copyof !== undefined){
                for(let question of quiz.copyof.questions){
                    for(let ans of question.answer){
                        delete ans?.checked
                        delete ans?.type
                        delete ans?.matchString
                    }
                }
            }
        }
    }

    return quizzesFinal
}

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
        if(quiz.copyof !== null && quiz.copyof !== undefined){
            for(let question of quiz.copyof.questions){
                for(let ans of question.answer){
                    delete ans?.checked
                    delete ans?.type
                    delete ans?.matchString
                }
            }
        }
    }

    return quizzesFinal
}

export function getRunningQuizzesWithOutCorrectAnswer(quizzes: any){
    let quizzesFinal = quizzes

    for(let quiz of quizzesFinal){
        for(let question of quiz.questions){
            for(let ans of question.answer){
                delete ans?.checked
                delete ans?.type
                delete ans?.matchString
            }
        }

        for(let question of quiz.copyof.questions){
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

export function initialTakeQuizAnswer(quiz: any){
    const quizFinal = quiz
    let id = 0
    for(let question of quizFinal.questions){
        
        if (question.type === 'single-choice'){
            quizFinal.answers.push({
                questionId: id,
                selectedId: null 
            })
        }
        
        if(question.type === 'multiple-choice'){
            quizFinal.answers.push({
                questionId: id,
                selectedIds: [] 
            })
        }

        if(question.type === 'fill-choice'){
            quizFinal.answers.push({
                questionId: id,
                matchString: null
            })
        }
     
        id++
    }

    return quizFinal
}

export function getTakeQuizWithOutAnswer(quiz: any) {
    const quizFinal = quiz

    for(let question of quizFinal.questions){
        for(let ans of question.answer){
            delete ans?.checked
            delete ans?.type
            delete ans?.matchString
        }
    }

    return quizFinal
}