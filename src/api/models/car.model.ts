import mongoose from "mongoose";


export interface CarModel extends mongoose.Document {
    brand: string;
    model: string;
    year: number;
    color: string;
    price: number;
    description: string;
    itsOn: boolean;
    on: boolean;
    off: boolean
    
}

export const carSchema = new mongoose.Schema(
    {
        brand: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        itsOn: {
            type: Boolean,
            default: false,
        },
        on: {
            type: Boolean,
            default: false,
        },
        off: {
            type: Boolean,
            default: true,
        }
    },
    {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
)

export const Car = mongoose.model<CarModel>('Car', carSchema);