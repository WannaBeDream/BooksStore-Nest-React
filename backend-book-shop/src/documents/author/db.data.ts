import { Document , Schema  } from 'mongoose';
// import { BookSchema } from 'src/documents/book/book.schema';

export interface Author extends Document  {
    id?: string;
    username: string;
    books: any[];
}
