import { Category } from "../schemas/quizzes.schema";
export declare class CreateQuizDto {
    readonly name: string;
    readonly description: string;
    readonly category: Category;
}
