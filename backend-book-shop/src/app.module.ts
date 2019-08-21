//nest modules
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
//Controllers
import { AppController } from 'src/controllers/app.controller';
import { BooksController } from 'src/controllers/book.controller'; 
import { UsersController } from 'src/controllers/user.controller';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthorsController } from 'src/controllers/author.controller';
//Services
// import { AppService } from 'src/services/app.service';
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
import { usersProviders } from 'src/providers/users.providers'
// Repositories
import { BookRepository } from 'src/repositories/book.repository'
import { UserRepository } from 'src/repositories/user.repository'

// JWT
import { LocalStrategy } from 'src/strategy/local.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: {
        expiresIn: '60s'
      },
    }),
  ],
  controllers: [AppController,
                BooksController,
                AuthController,
                UsersController,
                AuthorsController
  ],
  providers: [BooksService,
              AuthService,
              AuthorsService,
              UsersService,
              BookRepository,
              UserRepository,
              LocalStrategy,
              ...databaseProviders,
              ...booksProviders,
              ...usersProviders
  ]
}) 
export class AppModule {}
