import { Connection } from 'mongoose';
// Schemas
import { AuthorSchema } from 'src/documents/author/author.schema';

export const authorsProviders = [
    {
        provide: 'AUTHOR_MODEL',
        useFactory: (connection: Connection) => connection.model('Author', AuthorSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
