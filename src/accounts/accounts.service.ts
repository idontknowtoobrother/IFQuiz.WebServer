import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../auth/schemas/user.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

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

}