import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { UserSchema } from '../auth/schemas/user.schema';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema}
    ]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService]
})
export class AccountsModule {}
