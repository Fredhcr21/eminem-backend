"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("./middlewares");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const property_routes_1 = __importDefault(require("./routes/property.routes"));
function routes(app) {
    // Public
    app.use('/property', property_routes_1.default);
    // Private : Token needed
    app.use('/user', middlewares_1.isLoggedIn, user_routes_1.default);
}
exports.default = routes;
