import { Document, Schema } from 'mongoose';

export interface BookDoc extends Document {
  readonly  id?: string;
  readonly  title: string;
  readonly  description: string;
  readonly  authors: any[];
  readonly  coast: number;
}
