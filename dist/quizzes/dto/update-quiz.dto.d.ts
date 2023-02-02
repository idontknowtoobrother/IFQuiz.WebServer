import { User } from "../../auth/schemas/user.schema";
import { Category } from "../schemas/quizzes.schema";
export declare class UpdateQuizDto {
    readonly name: string;
    readonly description: string;
    readonly category: Category;
    readonly user: User;
}
