import { Document, Schema } from 'mongoose';

export interface Book extends Document {
  readonly  _id?: Schema.Types.ObjectId;
  readonly  title?: string;
  readonly  description: string;
  readonly  authors?: string[];
  readonly  coast?: string;
}
