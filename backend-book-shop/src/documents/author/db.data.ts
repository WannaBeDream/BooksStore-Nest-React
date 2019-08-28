import { Document , Schema  } from 'mongoose';

export interface Author extends Document  {
    _id: Schema.Types.ObjectId;
    username: string;
}
