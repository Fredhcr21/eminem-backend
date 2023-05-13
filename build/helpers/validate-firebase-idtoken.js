"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFirebaseIDToken = void 0;
const auth_1 = require("firebase-admin/auth");
const initialize_firebase_app_1 = __importDefault(require("./initialize-firebase-app"));
function validateFirebaseIDToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, auth_1.getAuth)(initialize_firebase_app_1.default).verifyIdToken(token);
            return user.uid;
        }
        catch (err) {
            const errorStr = String(err).toLowerCase();
            throw new Error(errorStr);
        }
    });
}
exports.validateFirebaseIDToken = validateFirebaseIDToken;
