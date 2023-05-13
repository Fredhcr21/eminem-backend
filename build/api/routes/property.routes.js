"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
exports.default = express_1.default
    .Router()
    .get('/', controllers_1.PropertyController.find)
    .get('/:id', controllers_1.PropertyController.getById)
    .post('/', controllers_1.PropertyController.create)
    .put('/:id', controllers_1.PropertyController.update)
    .delete('/:id', controllers_1.PropertyController.deleteById);
