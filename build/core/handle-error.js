"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_error_1 = __importDefault(require("./abstract-error"));
const api_errors_1 = require("./api-errors");
const logger_1 = __importDefault(require("./logger"));
const handleError = (err) => {
    if (err instanceof abstract_error_1.default) {
        logger_1.default.error(err.message, 'Error caught');
        return err;
    }
    const error = new api_errors_1.UnexpectedError(err.message);
    logger_1.default.error(error.message, 'Unexpected Error caught');
    return error;
};
exports.default = handleError;
