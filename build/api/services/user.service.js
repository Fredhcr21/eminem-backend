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
exports.updateUserRoles = exports.deleteById = exports.update = exports.getById = exports.find = void 0;
const moment_1 = __importDefault(require("moment"));
const geo_tz_1 = __importDefault(require("geo-tz"));
const helpers_1 = require("../../helpers");
const models_1 = require("../models");
const getFiltersQuery = (queryParams) => {
    let filters = {};
    const orQuery = [];
    if (queryParams) {
        const query = queryParams;
        if (query.email) {
            const filter = {
                email: helpers_1.Helpers.utils.stringToRegex(query.email),
            };
            orQuery.push(filter);
        }
        if (query.fullname) {
            const filter = {
                fullname: helpers_1.Helpers.utils.stringToRegex(query.fullname),
            };
            orQuery.push(filter);
        }
        if (orQuery.length > 0) {
            filters = {
                $or: orQuery,
            };
        }
    }
    return filters;
};
const find = (filter, paginationQuery) => __awaiter(void 0, void 0, void 0, function* () {
    // Run the query
    const totalCount = yield models_1.User.estimatedDocumentCount();
    const query = getFiltersQuery(filter);
    const items = yield models_1.User.find(query)
        .populate('roles')
        .sort(paginationQuery.sort)
        .skip(paginationQuery.skip)
        .limit(paginationQuery.limit)
        .exec();
    return {
        items,
        totalCount,
    };
});
exports.find = find;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findById(id).populate('roles');
    if (!user) {
        throw 'Could not find the User with the given ID';
    }
    return user;
});
exports.getById = getById;
const update = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userToUpdate = yield models_1.User.findById(id).exec();
    if (!userToUpdate)
        throw 'User does not exists';
    if (user.fullName)
        userToUpdate.fullName = user.fullName;
    if (user.gender)
        userToUpdate.gender = user.gender;
    if (user.birthDayTime) {
        if (!(0, moment_1.default)(user.birthDayTime, 'YYYY-MM-DD HH:mm').isValid())
            throw new Error('Property `birthdayTime` should be in format `YYYY-MM-DD HH:mm`');
        userToUpdate.birthDayTime = user.birthDayTime;
    }
    if (user.placeOfBirth) {
        const { placeOfBirth: { location: { latitude, longitude }, }, } = user;
        const [tz] = (0, geo_tz_1.default)(latitude, longitude);
        userToUpdate.birthDayTimeZone = tz;
        userToUpdate.placeOfBirth = user.placeOfBirth;
    }
    if (user.placeOfResidence) {
        const { placeOfResidence: { location: { latitude, longitude }, }, } = user;
        const [tz] = (0, geo_tz_1.default)(latitude, longitude);
        userToUpdate.placeOfResidenceTimeZone = tz;
        userToUpdate.placeOfResidence = user.placeOfResidence;
    }
    userToUpdate.save();
    return userToUpdate;
});
exports.update = update;
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findByIdAndDelete(id);
    if (!user)
        throw 'Could not find the User with the given ID';
    return user;
});
exports.deleteById = deleteById;
const updateUserRoles = (id, roles) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findById(id).exec();
    if (!user)
        throw 'User does not exists';
    user.roles = roles;
    user.save();
    return user;
});
exports.updateUserRoles = updateUserRoles;
