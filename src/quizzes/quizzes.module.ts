import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { QuizzesSchema } from './schemas/created.quizzes.schema';
import { DeployedQuizzesSchema } from './schemas/deployed.quizzes.schema';
import { RunningQuizzesSchema } from './schemas/running.quizzes.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: "Quizzes", schema: QuizzesSchema },
      {name: "DeployedQuizzes", schema: DeployedQuizzesSchema},
      {name: "RunningQuizzes", schema: RunningQuizzesSchema}
    ])
  ],
  controllers: [QuizzesController],
  providers: [QuizzesService]
})
export class QuizzesModule {}
