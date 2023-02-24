import { User } from 'src/auth/schemas/user.schema';
import { AccountsService } from './accounts.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
export declare class AccountsController {
    private userService;
    constructor(userService: AccountsService);
    updateStatus(updateStatusDto: UpdateStatusDto, req: any): Promise<User>;
    updateProfile(updateProfileDto: UpdateProfileDto, req: any): Promise<User>;
}
