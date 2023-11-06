import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  HttpStatus,
  BadRequestException,
  Header,
  Redirect,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('redirect/docs')
  @Redirect('https://docs.nestjs.com', HttpStatus.FOUND)
  getDocs(@Query('version') version) {
    if (version && version === '5')
      return { url: 'https://docs.nestjs.com/v5/' };
  }

  @Get(':userId/memo/:memoId')
  findUserMemo(@Param() params: { [key: string]: string }) {
    return { userId: params.userId, memoId: params.memoId };
  }

  @Get(':userId/note/:noteId')
  findUserNote(
    @Param('userId') userId: string,
    @Param('noteId') noteId: string,
  ) {
    return {
      userId: userId,
      noteId: noteId,
    };
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Res() res) {
    const users = this.usersService.findAll();
    return res.status(200).send(users);
  }

  @Redirect('https://nestjs.com', HttpStatus.MOVED_PERMANENTLY)
  @Header('Custom', 'Test Header')
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (+id < 1) {
      throw new BadRequestException('id는 0보다 큰 값이어야 합니다.');
    }
    return this.usersService.findOne(+id);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
