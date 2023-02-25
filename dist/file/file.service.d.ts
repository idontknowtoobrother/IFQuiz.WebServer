import { User } from 'src/auth/schemas/user.schema';
export declare class FileService {
    getUserId(user: User): Promise<String>;
}
