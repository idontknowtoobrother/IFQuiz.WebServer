import * as mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { UpdateStatusDto } from './dto/update-status.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: mongoose.Model<User>);
    updateStatus(updateStatus: UpdateStatusDto, userId: string): Promise<String>;
}
