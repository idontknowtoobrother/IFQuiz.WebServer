import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../auth/schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Messages } from '../utils/dto/message.dto';

@Injectable()
export class AccountsService {

    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>
    ){}

    async updateStatus(updateStatus: UpdateStatusDto, userId: string): Promise<User> {
        if(!mongoose.isValidObjectId(userId)) throw new BadRequestException('Incorrect id.')

        return await this.userModel.findOneAndUpdate({
            _id: userId
        }, updateStatus ,{
            new: true,
            runValidators: true
        })
        
    }


    async updateProfile(updateProfile: UpdateProfileDto, userId: string): Promise<User> {
        if(!mongoose.isValidObjectId(userId)) throw new BadRequestException('incorrect id.')
        
        return await this.userModel.findOneAndUpdate({
            _id: userId
        },updateProfile, {
            new: true,
            runValidators: true
        })
    }

    async changePassword(changePasswordDto: ChangePasswordDto, userId: string): Promise<Messages>{
        const { password } = changePasswordDto;
        const hashedPassword = await bcrypt.hash(password, 10)
        await this.userModel.findOneAndUpdate({
            _id: userId
        }, {
            password: hashedPassword
        }, {
            new: true,
            runValidators: true
        })
        return {
            message: [
                'Password updated.'
            ]
        }
    }

}