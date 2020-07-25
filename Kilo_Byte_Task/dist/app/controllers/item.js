"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Item_1 = require("../models/Item");
const settings_1 = require("../../config/settings");
const lodash_1 = __importDefault(require("lodash"));
let item = {
    add: (data) => {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const entity = new Item_1.Item();
            lodash_1.default.forEach(data, (val, key) => {
                entity[key] = val;
            });
            entity.save((err, doc) => __awaiter(this, void 0, void 0, function* () {
                if (err && !doc) {
                    if (err.code === 11000)
                        return resolve(Object.assign({}, settings_1.errorObj, { message: "Phone no. already exist" }));
                    console.log(err);
                    return resolve(Object.assign({}, settings_1.errorObj, { message: "Error Saving Item Details" }));
                }
                return resolve(Object.assign({}, settings_1.successObj, { message: "Item added successfully", data: doc }));
            }));
        }));
    },
    list: (data) => {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            let matchObj = Object.assign({}, data);
            let countQuery = Item_1.Item.count(Object.assign({}, matchObj));
            Item_1.Item.find(Object.assign({}, matchObj)).lean().exec((error, doc, success) => __awaiter(this, void 0, void 0, function* () {
                if (error || !doc) {
                    console.error(error);
                    error = {
                        message: "Error in Order List",
                        data: doc,
                        success: false,
                        type: "success",
                        error: true
                    };
                    return resolve(error);
                }
                if (doc) {
                    countQuery.exec((err, totalData) => {
                        return resolve(Object.assign({}, settings_1.successObj, { message: "Item List", total: totalData, data: doc }));
                    });
                }
            }));
        }));
    },
    getById: (_id) => {
        return new Promise((resolve) => {
            Item_1.Item.findOne({ _id })
                .lean()
                .exec((error, doc, success) => {
                if (error || !doc) {
                    return resolve(undefined);
                }
                resolve(doc);
            });
        });
    },
    addAddressById: (arr, itemsArr) => {
        return new Promise((resolve) => {
            Item_1.Item.find({ _id: { $in: arr } }, { addresses: 1 })
                .lean()
                .exec((error, doc) => {
                if (error || !doc) {
                    return resolve([]);
                }
                lodash_1.default.forEach(itemsArr, (val) => {
                    lodash_1.default.forEach(doc, (elem) => {
                        console.log(val, elem);
                        if (val._id == elem._id) {
                            let randomIndex = lodash_1.default.random(0, elem.addresses.length - 1);
                            val.pickupLocation = elem.addresses[randomIndex];
                        }
                    });
                });
                resolve(itemsArr);
            });
        });
    },
};
exports.default = item;
//# sourceMappingURL=item.js.map