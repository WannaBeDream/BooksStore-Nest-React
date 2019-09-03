import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
    title: String,
    description: String,
    authors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        }],
    coast: Number,
});

// const Author = mongoose.model('Author', AuthorSchema);
