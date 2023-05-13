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
exports.deleteById = exports.update = exports.create = exports.getById = exports.find = void 0;
const models_1 = require("../models");
const find = (paginationQuery) => __awaiter(void 0, void 0, void 0, function* () {
    // Run the Query
    const totalCount = yield models_1.Property.estimatedDocumentCount();
    let query = models_1.Property.find();
    const items = yield query.sort(paginationQuery.sort).skip(paginationQuery.skip).limit(paginationQuery.limit).exec();
    return {
        items,
        totalCount,
    };
});
exports.find = find;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const property = yield models_1.Property.findById(id);
    if (!property) {
        throw 'Could not find the Property with de given ID';
    }
    return property;
});
exports.getById = getById;
const create = (propertyModel) => __awaiter(void 0, void 0, void 0, function* () {
    const newProperty = yield new models_1.Property(propertyModel).save();
    return newProperty;
});
exports.create = create;
const update = (id, property) => __awaiter(void 0, void 0, void 0, function* () {
    const updateProperty = yield models_1.Property.findByIdAndUpdate(id, property, {
        new: true,
    });
    if (!updateProperty)
        throw 'Property does not exists';
    return updateProperty;
});
exports.update = update;
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const property = yield models_1.Property.findByIdAndDelete(id);
    if (!property)
        throw 'The current Property does not exists';
    return property;
});
exports.deleteById = deleteById;
