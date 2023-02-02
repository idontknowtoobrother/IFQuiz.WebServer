import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { QuizzesSchema } from './schemas/quizzes.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: "Quizzes", schema: QuizzesSchema }
    ])
  ],
  controllers: [QuizzesController],
  providers: [QuizzesService]
})
export class QuizzesModule {}
