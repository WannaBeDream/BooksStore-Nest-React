import { Connection } from 'mongoose';
// Schemas
import { BookSchema } from 'src/documents/book/book.schema';

export const booksProviders = [
    {
        provide: 'BOOK_MODEL',
        useFactory: (connection: Connection) => connection.model('Book', BookSchema),
        inject: ['DATABASE_CONNECTION'],
    }
];