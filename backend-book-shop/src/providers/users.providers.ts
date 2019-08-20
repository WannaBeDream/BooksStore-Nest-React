import { Connection } from 'mongoose';
// Schemas
import { UserSchema } from 'src/documents/user/user.schema';

export const usersProviders = [
    {
        provide: 'USER_MODEL',
        useFactory: (connection: Connection) => connection.model('User', UserSchema),
        inject: ['DATABASE_CONNECTION'],
    }
];