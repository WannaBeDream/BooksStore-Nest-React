import * as mongoose from 'mongoose';
import { AuthorSchema } from 'src/documents/author/author.schema';

export const BookSchema = new mongoose.Schema({
    title: String,
    description: String,
    authors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'authors',
        }],
    coast: Number,
});

// const Author = mongoose.model('Author', AuthorSchema);
