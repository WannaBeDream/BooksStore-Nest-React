
import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Book } from 'src/documents/book/db.data';


@Injectable()
export class BookRepository {
  constructor(
    @Inject('BOOKS_MODEL')
    private readonly bookModel: Model<Book>,
  ) {}

  async create(book: Book): Promise<Book> {
    const createdBook = new this.bookModel(book);
    return await createdBook.save();
  }

  async findAll(): Promise<Book[]> {
    return await this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    return await this.bookModel.findOne({ _id: id });
  }

  async delete(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndRemove(id);
  } 

  async update(id: string, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, book, { new: true });
  }
  
}