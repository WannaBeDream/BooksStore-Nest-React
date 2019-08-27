import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Book } from 'src/documents/book/db.data';

@Injectable()
export class BookRepository {
  constructor(
    @Inject('BOOK_MODEL')
    private readonly bookModel: Model<Book>,
  ) {}

  async create(book: Book): Promise<Book> {
    const createdBook = new this.bookModel(book);
    const newBook = await createdBook.save();
    return newBook;
  }

  async findAll(): Promise<Book[]> {
   const books = await this.bookModel.find().exec();
   return books;
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findOne({ _id: id });
    return book;
  }

  async update(id: string, book: Book): Promise<Book> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(id, book, { new: true });
    return updatedBook;
  }

  async delete(id: string): Promise<Book> {
    const deletedBook = await this.bookModel.deleteOne(id); // use method delete(id)
    return deletedBook;
  }

}
