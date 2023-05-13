"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./database"));
exports.Config = {
    app: app_1.default,
    database: database_1.default,
};
