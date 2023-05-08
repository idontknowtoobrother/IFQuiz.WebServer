import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { CheckQuizzSchema } from './schemas/check_quizz.schema';
import { CheckQuizzController } from './check_quizz.controller';
import { CheckQuizzService } from './check_quizz.service';


@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: "CheckQuizz", schema: CheckQuizzSchema }
    ])
  ],
  controllers: [CheckQuizzController],
  providers: [CheckQuizzService]
})
export class CheckQuizzModule {}
