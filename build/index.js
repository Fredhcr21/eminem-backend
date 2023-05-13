"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const core_1 = require("./core");
const seed_1 = __importDefault(require("./seed"));
const seed = process.argv.find((arg) => arg === 'seed');
app_1.default.listen({ port: config_1.Config.app.port }, () => {
    core_1.logger.info(`🚀 ${config_1.Config.app.name} up and running in ${config_1.Config.app.env} @ http://localhost:${config_1.Config.app.port}`);
    if (seed) {
        seed_1.default.populateAuthPermissions();
        seed_1.default.populatePermissions();
        seed_1.default.populateRoles();
    }
});
