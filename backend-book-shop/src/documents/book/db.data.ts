import { Document } from 'mongoose';

export interface Book extends Document {
  readonly  id?: string;
  readonly  title?: string;
  readonly  description: string;
  readonly  authors?: any[];
  readonly  coast?: string;
}
