import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserDTO {
  @ApiModelProperty({ description: '用户名', example: 'admin' })
  @IsNotEmpty({ message: '请填写用户名' })
  username: string;
  @ApiModelProperty({ description: '用户密码', example: '123456' })
  @IsNotEmpty({ message: '请填写密码' })
  password: string;
}
