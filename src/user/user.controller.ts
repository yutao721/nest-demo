import { Controller, Get, Post, Body, Patch, Param, Delete, Version, HttpCode, Request, Query, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body('age') createUserDto) {
    console.log(createUserDto)
    // return this.userService.create(createUserDto);
    return {
      code: 200,
      // msg: createUserDto.name
    }
  }

  @Get()
  findAll(@Query() query, @Headers() header) {
    console.log(query)
    console.log(header)
    // return this.userService.findAll();
    return {
      code: 200,
      msg: query.name
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
