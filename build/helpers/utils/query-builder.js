"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToRegex = exports.buildPaginationQuery = void 0;
function buildPaginationQuery(query) {
    const { sort = 'id asc', skip = 0, limit = 20 } = query;
    return Object.assign(Object.assign({}, query), { sort, skip: Number(skip), limit: Number(limit) });
}
exports.buildPaginationQuery = buildPaginationQuery;
function stringToRegex(str) {
    const regExp = str
        // Replace all diacritics and special characters for a wildcard '.'
        .replace(/[^\w\s]/g, '.')
        // Replace all whitespace to allow the completion of any partail name
        .replace(/\s+/g, '.*');
    return {
        $regex: regExp,
        $options: 'i',
    };
}
exports.stringToRegex = stringToRegex;
