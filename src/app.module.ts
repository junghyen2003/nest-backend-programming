import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ApiController } from './api/api.controller';

@Module({
  // 같은 엔드포인트 일 경우 인덱스에 따라 처리
  controllers: [ApiController, AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
