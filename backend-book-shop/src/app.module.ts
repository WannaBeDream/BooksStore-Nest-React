import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//Controllers
import { AppController } from './app.controller';
import { BooksController } from './Controllers/books/books.controller';
import { UsersController } from './Controllers/users/users.controller';
import { AuthController } from './Controllers/auth/auth.controller';
import { AuthorsController } from './Controllers/authors/authors.controller';
//Services
import { AppService } from './app.service';
import { BooksService } from './Services/books/books.service';
import { UsersService } from './Services/users/users.service';
import { AuthService } from './Services/auth/auth.service';
import { AuthorsService } from './Services/authors/authors.service';
//Schemas
import { BookSchema, UserSchema } from './Repositories/schemas/index';
import config from './Environment/config/keys';

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
