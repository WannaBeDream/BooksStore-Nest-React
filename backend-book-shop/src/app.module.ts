//nest modules
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//Controllers
import { AppController } from 'src/app.controller';
import { BooksController } from 'src/controllers/book.controller'; 
import { UsersController } from 'src/controllers/user.controller';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthorsController } from 'src/controllers/author.controller';
//Services
import { AppService } from 'src/app.service';
import { BooksService } from 'src/services/book.service';
import { UsersService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';
import { AuthorsService } from 'src/services/author.service';
//Schemas
import { BookSchema } from 'src/documents/book/book.schema';
import { UserSchema } from 'src/documents/user/user.schema';
//Config
import config from 'src/environment/config-dev/keys';

//Providers
import { databaseProviders } from 'src/providers/database.providers';
import { booksProviders } from 'src/providers/books.providers'

import { BookRepository } from 'src/repositories/book.repository'

@Module({
  imports:  [MongooseModule.forRoot(config.mongoURI , { useNewUrlParser: true, useFindAndModify: false }),
    MongooseModule.forFeature([
      { name: 'Books', schema: BookSchema },
      { name: 'Users', schema: UserSchema }
    ]
  )
], 
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
              ...databaseProviders,
              ...booksProviders,
              BookRepository
  ]
}) 
export class AppModule {}
