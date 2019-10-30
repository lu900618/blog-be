import { User } from './user.model';
import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [
    TypegooseModule.forFeature([User]),
  ],
})
export class LoginModule { }
