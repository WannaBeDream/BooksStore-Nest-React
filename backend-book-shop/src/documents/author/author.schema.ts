import * as mongoose from 'mongoose';

export const AuthorSchema = new mongoose.Schema({
    username: String,
});
