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

    async findOne(id: string): Promise<Book> {
        return await this.bookModel.findOne({ _id: id });
    }

    async create(createBookDto: BookDTO): Promise<Book> {
        const createdBook = new this.bookModel(createBookDto);
        return await createdBook.save();
    }

    async delete(id: string): Promise<Book> {
        return await this.bookModel.findByIdAndRemove(id);
    }

    async update(id: string, book: BookDTO): Promise<Book> {
        return await this.bookModel.findByIdAndUpdate(id, book, { new: true });
 }

    
}




// import { Injectable , HttpException } from '@nestjs/common' ;
//  import { BOOKS } from '../mocks/books.mock' ;
//   @ Injectable ( ) 
//   export class BooksService {
//        books = BOOKS ;
//         getBooks ( ) : Promise < any > { 
//             return new Promise ( resolve => 
//                 { resolve ( this . books ) ; } ) 
//                 ; } 
                
//         getBook ( bookID ) : Promise < any > 
//         { let id = Number ( bookID ) ;
//              return new Promise ( resolve => 
//                 { const book = this . books . find ( book => book . id === id ) ;
//                      if ( ! book ) { throw new HttpException ( 'Book does not exist!' , 404 ) ; } resolve ( book ) ; } ) ; } } 