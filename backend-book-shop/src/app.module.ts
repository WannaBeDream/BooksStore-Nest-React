//nest modules
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//Controllers
import { AppController } from './app.controller';
import { BooksController } from '@BooksController';
import { UsersController } from '@UsersController';
import { AuthController } from '@AuthController';
import { AuthorsController } from '@AuthorsController';
//Services
import { AppService } from './app.service';
import { BooksService } from '@BooksService';
import { UsersService } from '@UsersService';
import { AuthService } from '@AuthService';
import { AuthorsService } from '@AuthorsService';
//Schemas
import { BookSchema } from '@bookSchema';
import { UserSchema } from '@userSchema';
//Config
import config from '@config';

@Module({
  imports:  [MongooseModule.forRoot(config.mongoURI , { useNewUrlParser: true }),
    MongooseModule.forFeature([
      { name: 'Books', schema: BookSchema },
      { name: 'Users', schema: UserSchema }
    ]
  )
], // 10.09 add AuthModule 
  controllers: [AppController,
                BooksController,
                AuthController,
                UsersController,
                AuthorsController
  ],
  providers: [AppService,
              BooksService,
              AuthService,
              AuthorsService,
              UsersService,
  ],
}) 
export class AppModule {}
