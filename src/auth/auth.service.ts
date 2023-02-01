import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schemas';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt/dist';
import { SignUpDTO } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ){}

    async signUp(signUpDTO: SignUpDTO): Promise<{ token: string}>{
        const { email, password, fullname, birthday } = signUpDTO

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.userModel.create({
            email,
            password: hashedPassword,
            fullname,
            birthday
        })

        const token = this.jwtService.sign({
            id: user._id
        })

        return { token }
    }
}
