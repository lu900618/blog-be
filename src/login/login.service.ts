import { UserDTO } from './UserDTO';
import { User } from './user.model';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class LoginService {
  constructor(@InjectModel(User) private readonly userModel: ReturnModelType<typeof User>) { }

  async register(user: UserDTO) {
    return await this.userModel.create(user);
  }

  async login(user: UserDTO) {
    const userList: UserDTO[] = await this.userModel.find(user);
    const isRegister: boolean = userList.length > 0;
    if (!isRegister) {
      throw new HttpException({message: '用户名或密码错误'}, HttpStatus.BAD_REQUEST);
    }
    return userList[0];
  }
}
