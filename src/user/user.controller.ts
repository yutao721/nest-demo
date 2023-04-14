import { Controller, Get, Post, Body, Patch, Param, Delete, Version, HttpCode, Request, Query, Headers, Res, Req, Session, ParseUUIDPipe, ParseIntPipe, UseGuards, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';
// import { UserPipe } from './user.pipe';
import { RoleGuard } from './role.guard';
import { Role } from './role.decorator';
import { ApiTags, ApiOperation } from '@nestjs/swagger'


// @UseGuards(RoleGuard)
@Controller('user')
@ApiTags('用户相关接口')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('code')
  @ApiOperation({ summary: '获取验证码', description: '获取验证码的接口' })
  createCaptcha(@Req() req, @Res() res, @Session() session) {
    const captcha = svgCaptcha.create({
      size: 4,//生成几个验证码
      fontSize: 50, //文字大小
      width: 100,  //宽度
      height: 34,  //高度
      background: '#cc9966',  //背景颜色
    })
    session.code = captcha.text //存储验证码记录到session
    res.type('image/svg+xml')
    res.send(captcha.data)
  }

  @Post('create')
  createUser(@Req() req, @Body() body, @Session() session) {
    console.log('session', req.session)
    // console.log(session, body)
    if (session.code.toLocaleLowerCase() === body?.code?.toLocaleLowerCase()) {
      return {
        message: "验证码正确"
      }
    } else {
      return {
        message: "验证码错误"
      }
    }
    // return {}
  }


  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @SetMetadata('role', ['admin'])
  @Role('admin')
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: string) {
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
