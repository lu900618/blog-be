import { LoginService } from './login.service';
import { UserDTO } from './UserDTO';
import { Controller, Post, Body, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiModelProperty } from '@nestjs/swagger';

@Controller()
@ApiUseTags('登录')
export class LoginController {

  constructor(private readonly loginService: LoginService) { }

  /**
   * 用户注册
   * @param user
   */
  @Post('register')
  @ApiOperation({ title: '用户注册' })
  register(@Body() user: UserDTO) {
    return this.loginService.register(user);
  }

  /**
   * 用户登录
   * @param user
   */
  @Post('login')
  @ApiOperation({ title: '用户登录' })
  login(@Body() user: UserDTO) {
    return this.loginService.login(user);
  }
}
