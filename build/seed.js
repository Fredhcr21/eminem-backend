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
const models_1 = require("./api/models");
function populatePermissions() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield new models_1.Permission({
            title: 'App module',
            name: 'accessToAppModule',
            level: 1,
            isSelected: false,
        }).save();
        const childs = yield Promise.all([
            new models_1.Permission({
                title: 'Read',
                name: 'canReadAppData',
                level: 2,
                isSelected: false,
                parent: result.id,
            }).save(),
            new models_1.Permission({
                title: 'Edit',
                name: 'canEditAppData',
                level: 2,
                isSelected: false,
                parent: result.id,
            }).save(),
            new models_1.Permission({
                title: 'Delete',
                name: 'canDeleteAppData',
                level: 2,
                isSelected: false,
                parent: result.id,
            }).save(),
        ]);
        result.childrens = childs.map((per) => per.id);
        result.save();
    });
}
function populateAuthPermissions() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield new models_1.Permission({
            title: 'Users Management module',
            name: 'accessToAuthModule',
            level: 1,
            isSelected: false,
        }).save();
        const childs = yield Promise.all([
            new models_1.Permission({
                title: 'Read',
                name: 'canReadAuthData',
                level: 2,
                isSelected: false,
                parent: result.id,
            }).save(),
            new models_1.Permission({
                title: 'Edit',
                name: 'canEditAuthData',
                level: 2,
                isSelected: false,
                parent: result.id,
            }).save(),
            new models_1.Permission({
                title: 'Delete',
                name: 'canDeleteAuthData',
                level: 2,
                isSelected: false,
                parent: result.id,
            }).save(),
        ]);
        result.childrens = childs.map((per) => per.id);
        result.save();
    });
}
function populateRoles() {
    return __awaiter(this, void 0, void 0, function* () {
        const roles = yield Promise.all([
            new models_1.Role({
                title: 'Administrator',
                isCoreRole: true,
                isDefaultRole: false,
            }).save(),
            new models_1.Role({
                title: 'User',
                isCoreRole: false,
                isDefaultRole: true,
            }).save(),
            new models_1.Role({
                title: 'Manager',
                isCoreRole: false,
                isDefaultRole: false,
            }).save(),
        ]);
        console.log(roles);
    });
}
exports.default = {
    populateAuthPermissions,
    populatePermissions,
    populateRoles,
};
