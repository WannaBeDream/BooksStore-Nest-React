import { Document } from 'mongoose';

export interface User extends Document  {
    readonly id?: string;
    readonly username: string;
    readonly email?: string;
    readonly password: string;
    readonly confirmPassword?: boolean;
    readonly role?: string;
    readonly createdDate?: Date;
}
