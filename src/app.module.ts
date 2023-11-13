import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { AppController } from './app.controller';

@Module({
  imports: [UsersModule, EmailModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
