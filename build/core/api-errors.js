"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.UnexpectedError = void 0;
const abstract_error_1 = __importDefault(require("./abstract-error"));
class UnexpectedError extends abstract_error_1.default {
    constructor() {
        super(...arguments);
        this.errorCode = 1001;
        this.statusCode = 500;
        this.errorMessage = 'Unexpected error';
    }
}
exports.UnexpectedError = UnexpectedError;
class UnauthorizedError extends abstract_error_1.default {
    constructor() {
        super(...arguments);
        this.errorCode = 1001;
        this.statusCode = 500;
        this.errorMessage = 'Unauthorized';
    }
}
exports.UnauthorizedError = UnauthorizedError;
/**
 * AFTER ADDING A NEW ERROR CLASS VERIFY YOU PUT IT IN THE RIGHT PLACE
 *
 * ERROR CLASSED ARE SORTED BY `errorCode` PLEASE KEEP THAT ORDER AND
 * VERIFY YOU AREN'T USING AN ERROR CODE THAT IS ALREADY BEING USED
 * BY OTHER ERROR CLASS.
 *
 * ERROR CODES CATEGORY:
 *
 * (1001 - 1999) => Unknown Errors
 * (2001 - 2999) => Authentication Errors
 * (3001 - 3999) => Validation Errors
 * (4001 - 4999) => State Errors
 */
