import * as mongoose from 'mongoose';
import { AuthorSchema } from 'src/documents/author/author.schema';

export const BookSchema = new mongoose.Schema({
    title: String,
    description: String,
    // authors: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Author' }],
    coast: String,
});

// const Author = mongoose.model('Author', AuthorSchema);
