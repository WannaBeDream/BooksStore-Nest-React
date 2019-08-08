import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { Book } from '../interfaces/book.interface';
import { BookDTO } from '../dto/book.dto';

@Injectable()
export class BooksService {
    constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

    async findAll(): Promise<Book[]> {
        return await this.bookModel.find();
    }

    async findOne(id:string): Promise<Book> {
        return await this.bookModel.findOne({ _id: id});  // дописать функционал CRUD
    }

    async 
}
