import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { QuizzesSchema } from './schemas/quizzes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Quizzes", schema: QuizzesSchema }
    ])
  ],
  controllers: [QuizzesController],
  providers: [QuizzesService]
})
export class QuizzesModule {}
