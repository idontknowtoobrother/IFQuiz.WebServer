import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/signup.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @Post('/singup')
    signUp(@Body() signUpDTO: SignUpDTO): Promise<{ token: string}> {
        return this.authService.signUp(signUpDTO);
    }
}
