import mongoose from "mongoose";

export interface DocumentResult<T> {
    _doc: T;
}

export interface ReservDoc extends Document, DocumentResult<ReservDoc> {
    
    fullName: string;
    phone: string;
    persons: number;
    date: Date;
    comment: string;
}

const ReservSchema = new mongoose.Schema<ReservDoc>(
    {
        fullName: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        persons: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        comment: {
            type: String,
        },

    },
    {
        timestamps: true
    }
)

export default mongoose.model('Reserv', ReservSchema)