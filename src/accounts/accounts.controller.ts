import { Body, Controller, Req, UseGuards } from '@nestjs/common';
import { Delete, Patch } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/schemas/user.schema';
import { Messages } from '../utils/dto/message.dto';
import { AccountsService } from './accounts.service';
import { ChangePasswordDto } from './dto/change-password.dto';
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
    ): Promise<UpdateStatusDto>{
        return this.userService.updateStatus(updateStatusDto, req.user._id)
    }


    @Patch('/edit') // update profile
    @UseGuards(AuthGuard())
    async updateProfile(
        @Body()
        updateProfileDto: UpdateProfileDto,
        @Req()
        req
    ): Promise<UpdateProfileDto>{
        return this.userService.updateProfile(updateProfileDto, req.user._id)
    }

    @Patch('/change-password') // change password
    @UseGuards(AuthGuard())
    async changePassword(
        @Body()
        changePasswordDto: ChangePasswordDto,
        @Req()
        req
    ): Promise<Messages>{
        return this.userService.changePassword(changePasswordDto, req.user._id)
    }
    


    @Delete('')
    @UseGuards(AuthGuard())
    async deleteAccount(
        @Req()
        req
    ): Promise<Messages>{
        return this.userService.deleteAccount(req.user._id)
    }

}
