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

    async updateStatus(updateStatus: UpdateStatusDto, userId: string): Promise<UpdateStatusDto> {
        if(!mongoose.isValidObjectId(userId)) throw new BadRequestException('Incorrect id.')

        await this.userModel.findOneAndUpdate({
            _id: userId
        }, updateStatus ,{
            new: true,
            runValidators: true
        })

        return updateStatus
    }


    async updateProfile(updateProfile: UpdateProfileDto, userId: string): Promise<UpdateProfileDto> {
        if(!mongoose.isValidObjectId(userId)) throw new BadRequestException('incorrect id.')
        
        await this.userModel.findOneAndUpdate({
            _id: userId
        },updateProfile, {
            new: true,
            runValidators: true
        })

        return updateProfile
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
            runValidators:true
        })
        return {
            message: [
                'Password updated.'
            ]
        }
    }

    async deleteAccount(userId: string): Promise<Messages> {
        
        await this.userModel.findByIdAndDelete({
            _id: userId
        },{
            new: true,
            runValidators: true
        })

        return {
            message: [
                'Deleted account.'
            ]
        }
    }

}