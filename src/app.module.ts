import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { TypegooseModule } from 'nestjs-typegoose'

@Module({
  imports: [
    TypegooseModule.forRoot("mongodb://localhost:27017/blog", {
      useNewUrlParser: true
    }),
    LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
