import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    confirmPassword: {
        type: Boolean,
        default: false,
    },
    email: String,
    role: String,
    createdDate: { type: Date, default: Date.now }, // Время создания пользователя
});
