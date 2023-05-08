import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { AccountsModule } from './accounts/accounts.module';
import { FileModule } from './file/file.module';
import { CheckQuizzModule } from './check_quizz/check_quizz.module';

@Module({ 
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }), 
    MongooseModule.forRoot(process.env.DB_URI), 
    AuthModule, 
    QuizzesModule, 
    AccountsModule, FileModule, CheckQuizzModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
