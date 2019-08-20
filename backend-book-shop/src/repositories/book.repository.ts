
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
    return await createdBook.save();
  }

  async findAll(): Promise<Book[]> {
    return await this.bookModel.find().exec();
  }

  async findOne(id: String): Promise<Book> {
    return await this.bookModel.findOne({ _id: id });
  }

  async delete(id: String): Promise<Book> {
    return await this.bookModel.findByIdAndRemove(id);
  } 

  async update(id: String, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, book, { new: true });
  }
  
}