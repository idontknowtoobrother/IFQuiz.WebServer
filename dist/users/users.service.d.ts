import * as mongoose from 'mongoose';
import { User } from '../auth/schemas/user.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: mongoose.Model<User>);
    updateStatus(updateStatus: UpdateStatusDto, userId: string): Promise<UpdateStatusDto>;
    updateProfile(updateProfile: UpdateProfileDto, userId: string): Promise<User>;
}
