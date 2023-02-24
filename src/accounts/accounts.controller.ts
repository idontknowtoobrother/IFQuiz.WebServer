import { Body, Controller, Req, UseGuards } from '@nestjs/common';
import { Patch } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/schemas/user.schema';
import { AccountsService } from './accounts.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('accounts')
export class AccountsController {
    constructor(private userService: AccountsService){}

    @Patch('/status') // update only status
    @UseGuards(AuthGuard())
    async updateStatus(
        @Body()
        updateStatusDto: UpdateStatusDto,
        @Req()
        req
    ): Promise<User>{
        return this.userService.updateStatus(updateStatusDto, req.user._id)
    }


    @Patch('/edit') // update profile
    @UseGuards(AuthGuard())
    async updateProfile(
        @Body()
        updateProfileDto: UpdateProfileDto,
        @Req()
        req
    ): Promise<User>{
        return this.userService.updateProfile(updateProfileDto, req.user._id)
    }

}
