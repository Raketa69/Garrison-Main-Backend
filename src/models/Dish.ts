import mongoose from "mongoose";

export interface DocumentResult<T> {
    _doc: T;
}

export interface DishDoc extends Document, DocumentResult<DishDoc> {
    name: string;
    description: string;
    price: number;
    type: string;
    weight: number,
    imageUrl: string
}

const DishSchema = new mongoose.Schema<DishDoc>(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        weight: {
            type: Number,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Dish', DishSchema)