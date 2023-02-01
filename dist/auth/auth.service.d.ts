import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt/dist';
import { SignUpDto } from './dto/signup.dto';
import { LoginDTO } from './dto/login.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    signUp(signUpDto: SignUpDto): Promise<{
        token: string;
    }>;
    login(loginDto: LoginDTO): Promise<{
        token: string;
    }>;
}
