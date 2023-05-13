"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractError extends Error {
    toJSON() {
        const message = this.message ? `: ${this.message}` : '';
        return {
            errorCode: this.errorCode,
            errorMessage: this.errorMessage,
        };
    }
}
exports.default = AbstractError;
