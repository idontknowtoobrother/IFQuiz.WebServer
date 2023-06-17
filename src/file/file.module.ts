import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from "../auth/schemas/user.schema";
import { QuizzesSchema } from '../quizzes/schemas/quizzes.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema},
      { name: "Quizzes", schema: QuizzesSchema},
    ])
  ],
  providers: [FileService],
  controllers: [FileController]
})
export class FileModule {}
