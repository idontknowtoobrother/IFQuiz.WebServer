import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
export declare class FileService {
    private userModel;
    constructor(userModel: Model<User>);
    updateProfileImage(userId: string, newImagePath: string): Promise<String>;
}
