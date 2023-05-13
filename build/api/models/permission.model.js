"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const permissionSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        required: true,
    },
    parent: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Permission',
    },
    childrens: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Permission',
        },
    ],
}, {
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    },
});
exports.Permission = mongoose_1.default.model('Permission', permissionSchema);
