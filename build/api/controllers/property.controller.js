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
exports.deleteById = exports.update = exports.create = exports.getById = exports.find = void 0;
const core_1 = require("../../core");
const services_1 = require("../services");
const helpers_1 = require("../../helpers");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const find = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        core_1.logger.debug(`GET /property : ${JSON.stringify(req.query)}`);
        // @ts-ignore
        const result = yield services_1.PropertyService.find(helpers_1.Helpers.utils.buildPaginationQuery(req.query));
        core_1.logger.debug(`GET /property response: ${JSON.stringify(result)}`);
        res.status(http_status_codes_1.default.OK).json(result);
        return next();
    }
    catch (err) {
        return next((0, core_1.handleError)(err));
    }
});
exports.find = find;
const getById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        core_1.logger.debug(`GET /property/:id : ${JSON.stringify(req.params)}`);
        const { id } = req.params;
        const result = yield services_1.PropertyService.getById(id);
        core_1.logger.debug(`GET /property/:id response: ${JSON.stringify(result)}`);
        res.status(http_status_codes_1.default.OK).json(result);
        return next();
    }
    catch (err) {
        return next((0, core_1.handleError)(err));
    }
});
exports.getById = getById;
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        core_1.logger.debug(`POST /property : ${JSON.stringify(req.body)}`);
        const property = req.body;
        const result = yield services_1.PropertyService.create(property);
        core_1.logger.debug(`POST /property response: ${JSON.stringify(result)}`);
        res.status(http_status_codes_1.default.OK).json(result);
        return next();
    }
    catch (err) {
        return next((0, core_1.handleError)(err));
    }
});
exports.create = create;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const property = req.body;
        core_1.logger.debug(`PUT /property/:id : ${JSON.stringify(id, property)}`);
        const result = yield services_1.PropertyService.update(id, property);
        core_1.logger.debug(`PUT /property/:id response: ${JSON.stringify(result)}`);
        res.status(http_status_codes_1.default.OK).json(result);
        return next();
    }
    catch (err) {
        return next((0, core_1.handleError)(err));
    }
});
exports.update = update;
const deleteById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        core_1.logger.debug(`DELETE /property/:id : ${JSON.stringify(req.params)}`);
        const { id } = req.params;
        const result = yield services_1.PropertyService.deleteById(id);
        core_1.logger.debug(`DELETE /property/:id response: ${JSON.stringify(result)}`);
        res.status(http_status_codes_1.default.OK).json(result);
        return next();
    }
    catch (err) {
        return next((0, core_1.handleError)(err));
    }
});
exports.deleteById = deleteById;
