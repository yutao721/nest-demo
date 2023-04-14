import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    private readonly PrismaService: PrismaService,
    private readonly httpService: HttpService,
  ) { }


  create(createUserDto: CreateUserDto) {
    return this.PrismaService.user.create({
      data: createUserDto
    })
  }

  findAll() {
    return this.PrismaService.user.findMany()
    // return this.httpService.get('http://localhost:5000/').pipe(map(res => {
    //   console.log(res.data)
    // }));
  }

  findOne(id: number) {
    return this.PrismaService.user.findUnique({
      where: {
        id,
      },
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.PrismaService.user.update({
      where: {
        id,
      },
      data: updateUserDto
    })
  }

  remove(id: number) {
    return this.PrismaService.user.delete({
      where: {
        id,
      },
    })
  }
}
