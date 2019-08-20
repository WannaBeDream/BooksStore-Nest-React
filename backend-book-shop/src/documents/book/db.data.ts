import { Document } from 'mongoose';

export interface Book extends Document {
  readonly  id?: String;
  readonly  title?: String;
  readonly  description: String;
  readonly  authors?: any[];
  readonly  coast?: String;
    
}