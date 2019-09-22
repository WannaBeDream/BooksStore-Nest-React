import * as mongoose from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { BookDoc } from 'src/documents/book/db.data';
import { CreateBook } from 'src/models/create/create.book.model';

@Injectable()
export class BookRepository {
  constructor(
    @Inject('BOOK_MODEL')
    private readonly bookModel: mongoose.Model<BookDoc>,
  ) {}

  async create(book: BookDoc): Promise<CreateBook> {
    const createdBook = new this.bookModel(book);
    const newBook = await createdBook.save((err, createdBook) => {
      createdBook
      .populate('authors')
      .execPopulate()
      .then((createdBook: object): void => {
          console.log('Book was created now =>  ' + `${createdBook}`);
      });
  });
    return newBook;
  }

  async findAll(): Promise<BookDoc[]> {
   const books = await this.bookModel.find().populate('authors').exec();
   return books;
  }

  async findOne(id: string): Promise<BookDoc> {
    const book = await this.bookModel.findById(id).populate('authors').exec();   // .populate('authors')
    return book;
  }

  async update(id: string, book: BookDoc): Promise<CreateBook> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(id, book, { new: true }).populate('authors').exec();
    return updatedBook;
  }

  async delete(id: string): Promise<BookDoc> {
    const deletedBook = await this.bookModel.deleteOne(id).populate('authors').exec(); // use method delete(id)
    return deletedBook;
  }

}
