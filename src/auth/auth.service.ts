import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schemas';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt/dist';
import { SignUpDto } from './dto/signup.dto';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ){}

    async signUp(signUpDto: SignUpDto): Promise<{ token: string}>{
        const { email, password, fullname, birthday } = signUpDto

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

        const responeUser = {
            email: user.email,
            fullname: user.fullname,
            status: user.status,
            birthday: user.birthday,
            token: token
        }

        return responeUser
    }

    async login(loginDto: LoginDTO): Promise<{ token: string}> {
        const { email, password } = loginDto
        
        // find a user email is valid in database ?
        const user = await this.userModel.findOne({ email })
        if(!user){
            throw new UnauthorizedException("Invalid email or password")
        }
        
        // check password is valid with user found ?
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if(!isPasswordMatched) {
            throw new UnauthorizedException("Invalid email or password")
        }

        const token = this.jwtService.sign({
            id: user._id
        })

        const responeUser = {
            email: user.email,
            fullname: user.fullname,
            status: user.status,
            birthday: user.birthday,
            token: token
        }

        return responeUser
    }
}
