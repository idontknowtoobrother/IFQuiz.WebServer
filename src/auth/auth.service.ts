import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt/dist';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ){}

    private readonly logger = new Logger(AuthService.name)

    async signUp(signUpDto: SignUpDto): Promise<{ token: string}>{

        this.logger.log(`signUp: ${JSON.stringify(signUpDto)}`)

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
            _id: user._id,
            email: user.email,
            fullname: user.fullname,
            status: user.status,
            birthday: user.birthday,
            imageUrl: user.imageUrl,
            backgroundMusic: user.backgroundMusic,
            soundEffect: user.soundEffect,
            token: token
        }

        this.logger.log(`signUp-response: ${JSON.stringify(responeUser)}`)
        return responeUser
    }

    async login(loginDto: LoginDto): Promise<{ token: string}> {
        this.logger.log(`login: ${JSON.stringify(loginDto)}`)
        const { email, password } = loginDto
        
        // find a user email is valid in database ?
        const user = await this.userModel.findOne({ email })
        if(!user){
            this.logger.error(`login: ${JSON.stringify(loginDto)}`)
            throw new UnauthorizedException("Invalid email or password")
        }
        
        // check password is valid with user found ?
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if(!isPasswordMatched) {
            this.logger.error(`login: ${JSON.stringify(loginDto)}`)
            throw new UnauthorizedException("Invalid email or password")
        }

        const token = this.jwtService.sign({
            id: user._id
        })

        const responeUser = {
            _id: user._id,
            email: user.email,
            fullname: user.fullname,
            status: user.status,
            birthday: user.birthday,
            imageUrl: user.imageUrl,
            backgroundMusic: user.backgroundMusic,
            soundEffect: user.soundEffect,
            token: token
        }

        this.logger.log(`login-response: ${JSON.stringify(responeUser)}`)

        return responeUser
    }
}
