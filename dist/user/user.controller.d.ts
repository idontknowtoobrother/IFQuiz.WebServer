import { UpdateStatusDto } from './dto/update-status.dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    updateStatus(updateStatusDto: UpdateStatusDto, req: any): Promise<String>;
}
