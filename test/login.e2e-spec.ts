import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { LoginModule } from '../src/login/login.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from '../src/login/user.model';

describe('LoginController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        LoginModule,
        TypegooseModule.forFeature([User]),
      ],
    })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/login (GET) 登录成功', async () => {
    const response = await request(app.getHttpServer())
      .post('/login')
      .send({ username: 'admin', password: 'admin' })
      .expect(201);

    expect(response.body.username).toBe('admin');
  });

  it('/login (GET) 登录失败', async () => {
    const response = await request(app.getHttpServer())
      .post('/login')
      .send({ username: 'adminqq', password: 'admin' })
      .expect(400);

    expect(response.body.username).toBeUndefined();
  });

  it('/register (GET) 注册成功', async () => {
    const response = await request(app.getHttpServer())
      .post('/register')
      .send({ username: 'admin803', password: 'admin' })
      .expect(201);

    expect(response.body.username).toBe('admin803');
  });

  it('/register (GET) 注册失败', async () => {
    const response = await request(app.getHttpServer())
      .post('/register')
      .send({ username: 'admin', password: 'admin' })
      .expect(400);

    expect(response.body.username).toBeUndefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
