import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String,
    createdDate: { type: Date, default: Date.now }, // Время создания пользователя
});
