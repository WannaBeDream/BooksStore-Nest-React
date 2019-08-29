import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
// import * as csurf from 'csurf';    // TODO
import * as rateLimit from 'express-rate-limit'; // somewhere in my initialization file

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
  .setTitle('Book-Store API')
  .setDescription('This book store')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

//   app.use(helmet()); // Armor headers
//   app.enableCors(); // CORS
//   // app.use(csurf()); // CSRF armor           //TODO
//   app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//   }),
// );
  await app.listen(3000);
}
bootstrap();
