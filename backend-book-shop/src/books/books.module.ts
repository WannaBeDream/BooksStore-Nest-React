import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { BooksController } from './books.controller';
import { BookSchema } from '../schemas/book.schema';
import { BooksService } from './books.service' 


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])],
  controllers: [BooksController],
  providers: [BooksService],
})

export class BooksModule {}
