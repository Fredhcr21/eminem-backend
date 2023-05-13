"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateUserRoles = exports.deleteById = exports.update = exports.getById = exports.find = void 0;
const logger_1 = __importDefault(require("../../core/logger"));
const HttpStatus = __importStar(require("http-status-codes"));
const services_1 = require("../services");
const helpers_1 = require("../../helpers");
const core_1 = require("../../core");
const find = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.debug(`GET /user : ${JSON.stringify(req.query)}`);
        const { filter = '{}' } = req.query;
        // @ts-ignore
        const result = yield services_1.UserService.find(JSON.parse(filter), helpers_1.Helpers.utils.buildPaginationQuery(req.query));
        logger_1.default.debug(`GET /user response: ${JSON.stringify(result)}`);
        res.status(HttpStatus.OK).json(result);
        return next();
    }
    catch (err) {
        return next((0, core_1.handleError)(err));
    }
});
exports.find = find;
const getById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.debug(`GET /user/:id : ${JSON.stringify(req.params)}`);
        const { id } = req.params;
        const result = yield services_1.UserService.getById(id);
        logger_1.default.debug(`GET /user/:id response: ${JSON.stringify(result)}`);
        res.status(HttpStatus.OK).json(result);
        return next();
    }
    catch (err) {
        return next((0, core_1.handleError)(err));
    }
});
exports.getById = getById;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = req.body;
        logger_1.default.debug(`PUT /user/:id : ${JSON.stringify(id, user)}`);
        const result = yield services_1.UserService.update(id, user);
        logger_1.default.debug(`PUT /user/:id response: ${JSON.stringify(result)}`);
        res.status(HttpStatus.OK).json(result);
        return next();
    }
    catch (err) {
        return next((0, core_1.handleError)(err));
    }
});
exports.update = update;
const deleteById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.debug(`DELETE /user/:id : ${JSON.stringify(req.params)}`);
        const { id } = req.params;
        const result = yield services_1.UserService.deleteById(id);
        logger_1.default.debug(`DELETE /user/:id response: ${JSON.stringify(result)}`);
        res.status(HttpStatus.OK).json(result);
        return next();
    }
    catch (err) {
        return next((0, core_1.handleError)(err));
    }
});
exports.deleteById = deleteById;
const updateUserRoles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.debug(`PUT /user/:id/roles : ${JSON.stringify(req.params)}`);
        const { id } = req.params;
        const roles = req.body;
        const result = yield services_1.UserService.updateUserRoles(id, roles);
        logger_1.default.debug(`PUT /user/:id/roles response: ${JSON.stringify(result)}`);
        res.status(HttpStatus.OK).json(result);
        return next();
    }
    catch (err) {
        return next((0, core_1.handleError)(err));
    }
});
exports.updateUserRoles = updateUserRoles;
