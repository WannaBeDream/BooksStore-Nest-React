import * as mongoose from 'mongoose';

export const AuthorSchema = new mongoose.Schema({
    username: String,
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
   }],
});
