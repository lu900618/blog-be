import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 生成api文档
  const options = new DocumentBuilder()
    .setTitle('博客API')
    .setDescription('The blog API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalFilters(new HttpExceptionFilter()); // 拦截全部的错误请求,统一返回格式
  app.useGlobalInterceptors(new TransformInterceptor()); // 统一请求成功的返回数据

  await app.listen(3000);
}
bootstrap();
