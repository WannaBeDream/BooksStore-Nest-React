import { Injectable,Inject } from '@nestjs/common';
import { Book } from 'src/models/book.model';
import { BookRepository } from 'src/repositories/book.repository'

@Injectable()
export class BooksService {
    constructor(private readonly bookRepository: BookRepository) {}

    
    async findAll(): Promise<Book[]> {
        return await this.bookRepository.findAll();
    }

    async findOne(id: String): Promise<Book> {
        return await this.bookRepository.findOne(id);
    }

    async create(book: Book): Promise<Book> { 
        return await this.bookRepository.create(book);
    }

    async delete(id: String): Promise<Book> {
        return await this.bookRepository.delete(id);
    }

    async update(id: String, book: Book): Promise<Book> {
        return await this.bookRepository.update(id, book);
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