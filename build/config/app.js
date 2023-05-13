"use strict";
/**
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
//  default setting are for development environment
const config = {
    debug: Boolean(process.env.DEBUG) || true,
    env: process.env.NODE_ENV || 'development',
    logLevel: process.env.LOG_LEVEL || 'debug',
    name: process.env.API_NAME || 'API Server',
    port: Number(process.env.PORT || 3000),
    requestLimit: process.env.REQUEST_LIMIT || '100kb',
    version: process.env.API_VERSION || '1.0.0',
};
exports.default = config;
