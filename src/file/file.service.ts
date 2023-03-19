import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import * as fs from 'fs';

@Injectable()
export class FileService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ){}


    async updateProfileImage(userId: string, newImagePath: string): Promise<String>{
        const user = await this.userModel.findById(userId, 'imageUrl')
        if(user.imageUrl){
            fs.unlink(`./resources/profile-image/${user.imageUrl}`, (err) => {})
        }

        await this.userModel.findOneAndUpdate({
            _id: userId
        },{
            imageUrl: newImagePath
        },{
            new: true,
            runValidators: true
        })
        return newImagePath
    }

}
