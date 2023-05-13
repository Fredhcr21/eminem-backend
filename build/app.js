"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = require("./config");
const core_1 = require("./core");
const routes_1 = __importDefault(require("./api/routes"));
const app = (0, express_1.default)();
// Enables the bodyParser.JSON middleware to parse and handle incoming request data in the request body in JSON format.
app.use(body_parser_1.default.json({ limit: config_1.Config.app.requestLimit }));
// Enables the bodyParser.urlencoded middleware to parse and handle incoming request data in the request body in form format.
app.use(body_parser_1.default.urlencoded({ extended: true, limit: config_1.Config.app.requestLimit }));
// Enable CORS middleware to allow requests from other domains
app.use((0, cors_1.default)());
// Connection with the Databse (MongoDB)
(0, core_1.connectDatabase)();
// Routes
(0, routes_1.default)(app);
exports.default = app;
