import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { QuizzesModule } from './quizzes/quizzes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }), 
    MongooseModule.forRoot('mongodb://localhost/ifquiz'), 
    AuthModule, 
    QuizzesModule
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    JwtStrategy
  ],
  exports: [
    JwtStrategy, 
    PassportModule
  ]
})

export class AppModule {}
