"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const logger_1 = __importDefault(require("./logger"));
const connectDatabse = () => {
    var _a;
    const userPass = config_1.Config.database.mongoUser && config_1.Config.database.mongoPassword
        ? `${config_1.Config.database.mongoUser}:${config_1.Config.database.mongoPassword}@`
        : '';
    const connectionURI = (_a = config_1.Config.database.mongoUri) !== null && _a !== void 0 ? _a : `mongodb://${userPass}${config_1.Config.database.mongoHost}:${config_1.Config.database.mongoPort}/${config_1.Config.database.mongoDB}`;
    mongoose_1.default.connect(connectionURI);
    const { connection } = mongoose_1.default;
    connection.on('error', (err) => logger_1.default.error('MongoDB connection error', err));
    connection.once('open', () => {
        logger_1.default.debug(`✔ MongoDB connection stablished`);
    });
};
exports.default = connectDatabse;
