"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
exports.errorObj = { error: true, type: "error", success: false };
exports.successObj = { error: false, type: "success", success: true };
exports.removeExtraTableParams = (obj) => {
    let x = Object.assign({}, obj);
    delete x.results;
    delete x.page;
    delete x.count;
    delete x.sortField;
    delete x.sortOrder;
    delete x.selectors;
    delete x.select;
    delete x.regExFilters;
    delete x.populateArr;
    delete x.project;
    delete x.dateFilter;
    lodash_1.default.forEach(x, (val, key) => {
        if (val == undefined)
            delete x[key];
    });
    return x;
};
//# sourceMappingURL=settings.js.map