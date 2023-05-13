"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const roleSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    permissions: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Permission',
        },
    ],
    isCoreRole: {
        type: Boolean,
        default: false,
    },
    isDefaultRole: {
        type: Boolean,
        default: false,
    },
}, {
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    },
});
exports.Role = mongoose_1.default.model('Role', roleSchema);
