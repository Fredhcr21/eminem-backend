"use strict";
/**
 * Interface for databse configuration settings
 *
 * @interface DatabaseConfig
 */
Object.defineProperty(exports, "__esModule", { value: true });
const databaseConfig = {
    mongoHost: process.env.MONGO_HOST || '127.0.0.1',
    mongoPort: Number(process.env.MONGO_PORT) || 27017,
    mongoDB: process.env.MONGO_DB || 'db',
    mongoUri: process.env.MONGO_URI,
    mongoUser: process.env.USE_AUTH === 'true' ? process.env.MONGO_USER : '',
    mongoPassword: process.env.USE_AUTH === 'true' ? process.env.MONGO_PASSWORD : '',
    useAuth: Boolean(process.env.USE_AUTH) || false,
};
exports.default = databaseConfig;
