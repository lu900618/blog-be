import { LoginModule } from './login.module';
import { AppModule } from '../app.module';
import { LoginService } from './login.service';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { User } from './user.model';
import { TypegooseModule } from 'nestjs-typegoose';

describe('Login Controller', () => {
  let controller: LoginController;
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        LoginModule,
        TypegooseModule.forFeature([User]),
      ],
      controllers: [LoginController],
      providers: [LoginService],
    }).compile();

    controller = module.get<LoginController>(LoginController);
    service = module.get<LoginService>(LoginService);
  });

  it('/POST /login 登录成功', async () => {
    const result = await controller.login({ username: 'admin', password: 'admin' });
    expect(result.username).toBe('admin');
  });

  it('/POST /login 登录失败', async () => {
    let result;
    try {
      result = await controller.login({ username: 'admin1', password: 'admin1' });
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  it('/POST /register 注册成功', async () => {
    const result = await controller.register({ username: 'admin' + Math.random(), password: 'admin' });
    expect(result.password).toBe('admin');
  });

  it('/POST /register 注册失败', async () => {
    try {
      const result = await controller.register({ username: 'admin', password: 'admin' });
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });
});
