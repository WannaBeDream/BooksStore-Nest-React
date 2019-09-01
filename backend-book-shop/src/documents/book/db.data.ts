import { Document, Schema } from 'mongoose';

export interface Book extends Document {
  readonly  id?: Schema.Types.ObjectId;
  readonly  title?: string;
  readonly  description: string;
  readonly  authors?: any[];
  readonly  coast?: number;
}
