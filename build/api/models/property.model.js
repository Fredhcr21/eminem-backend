"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const propertySchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    airConditioning: {
        type: Boolean,
        required: true,
    },
    availableFrom: {
        type: Number,
        required: true,
    },
    bathrooms: {
        type: Number,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    betweenStreets: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    equippedKitchen: {
        type: Boolean,
        required: true,
    },
    externalNumber: {
        type: String,
        required: true,
    },
    floors: {
        type: Number,
        required: true,
    },
    garageSize: {
        type: Number,
        required: true,
    },
    gym: {
        type: Boolean,
        required: true,
    },
    houseArea: {
        type: Number,
        required: true,
    },
    internalNumber: {
        type: String,
        required: true,
    },
    keywords: {
        type: [String],
        required: true,
    },
    laundryRoom: {
        type: Boolean,
        required: true,
    },
    neighborhood: {
        type: String,
        required: true,
    },
    petsAllowed: {
        type: Boolean,
        required: true,
    },
    pool: {
        type: Boolean,
        required: true,
    },
    postalCode: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    security: {
        type: Boolean,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Rent', 'Sale'],
    },
    street: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Apartment', 'House', 'Hotel', 'Villa'],
        required: true,
    },
    yardArea: {
        type: Number,
        required: true,
    },
    geo: {
        type: Number,
        required: true,
    },
    fullAddress: {
        type: String,
        required: true,
    },
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});
exports.Property = mongoose_1.default.model('Property', propertySchema);
