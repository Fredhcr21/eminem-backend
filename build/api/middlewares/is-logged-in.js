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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const validate_firebase_idtoken_1 = require("../../helpers/validate-firebase-idtoken");
function isLoggedIn(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.headers.authorization) {
                throw new Error('Unauthorized, Authorization header not provided');
            }
            const [, token] = req.headers.authorization.split(' ');
            if (!token) {
                throw new Error('Unauthorized token not privided');
            }
            const userUID = yield (0, validate_firebase_idtoken_1.validateFirebaseIDToken)(token);
            if (!userUID)
                throw new Error('Unauthorized');
            // Add the User UID to the request object
            req.me = userUID;
            return next();
        }
        catch (err) {
            res.status(403).send('Unauthorized, Authorization header not provided');
        }
    });
}
exports.isLoggedIn = isLoggedIn;
