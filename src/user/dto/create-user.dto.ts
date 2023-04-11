
// DTO 校验
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 10, {
    message: '5-10个字符'
  })
  name: string
  @IsNumber()
  age: number
}
