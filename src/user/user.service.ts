import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly PrismaService: PrismaService) { }

  create(createUserDto: CreateUserDto) {
    return this.PrismaService.user.create({
      data: createUserDto
    })
  }

  findAll() {
    return this.PrismaService.user.findMany()
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
