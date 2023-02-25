import { User } from "../../auth/schemas/user.schema";
import { Category } from "../schemas/quizzes.schema";
import { QuestionDto } from "./question.dto";
export declare class UpdateQuizDto {
    readonly name: string;
    readonly description: string;
    readonly category: Category;
    readonly user: User;
    readonly questions: QuestionDto[];
}
