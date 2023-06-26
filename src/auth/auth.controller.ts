import { Controller, Post, Body, Get, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { ApiTags, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';
import { TokenDto } from './dto/token.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @Post('/signup')
    @ApiCreatedResponse({
        description: 'Sign up',
        type: TokenDto
    })
    signUp(
        @Body() signUpDto: SignUpDto
    ): Promise<TokenDto> {
        return this.authService.signUp(signUpDto);
    }

    @Post('/login')
    @ApiCreatedResponse({
        description: 'Login',
        type: TokenDto
    })
    login(
        @Body() loginDto: LoginDto
    ): Promise<TokenDto> {
        return this.authService.login(loginDto)
    }

}
