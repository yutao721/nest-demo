// DTO 校验
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 20, {
    message: '2-20个字符',
  })
  name: string;
  email: string;
  profileViews: number;
}
