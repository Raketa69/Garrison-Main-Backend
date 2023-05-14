import mongoose from "mongoose";

export enum UserRole {
    admin = 'ADMIN',
    user = 'USER'
}

export interface DocumentResult<T> {
    _doc: T;
}

export interface UserDoc extends Document, DocumentResult<UserDoc> {
    fullName: string;
    email: string;
    passwordHash: string;
    phone: string;
    role: UserRole
}

const UserSchema = new mongoose.Schema<UserDoc>(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true
    }
)

export default mongoose.model('User', UserSchema)