import { Document , Schema  } from 'mongoose';
// import { BookSchema } from 'src/documents/book/book.schema';

export interface Author extends Document  {
    _id: Schema.Types.ObjectId;
    username: string;
    books: string[];
}
