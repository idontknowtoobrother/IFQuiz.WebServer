import { User } from 'src/auth/schemas/user.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UserService } from './users.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    updateStatus(updateStatusDto: UpdateStatusDto, req: any): Promise<UpdateStatusDto>;
    updateProfile(updateProfileDto: UpdateProfileDto, req: any): Promise<User>;
}
