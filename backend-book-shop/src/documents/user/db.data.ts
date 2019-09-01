import { Document } from 'mongoose';

export interface User extends Document  {
    id?: string;
    username: string;
    email?: string;
    password?: string;
    role?: string;
    createdDate?: Date;
}
