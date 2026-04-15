import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });

  // if (process.env.NODE_ENV === 'development') {
  const config = new DocumentBuilder()
    .setTitle('WeJobs API')
    .setDescription('API documentation for WeJobs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  // }
  await app.listen(process.env.PORT ?? 3040);
}
bootstrap();
