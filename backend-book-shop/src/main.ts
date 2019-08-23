import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import * as helmet from 'helmet'; 
// import * as csurf from 'csurf';    // TODO
import * as rateLimit from 'express-rate-limit'; // somewhere in my initialization file


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet()); // Armor headers
  app.enableCors(); // CORS
  // app.use(csurf()); // CSRF armor           //TODO
  app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }),
);
  await app.listen(3000);
  
}
bootstrap();
