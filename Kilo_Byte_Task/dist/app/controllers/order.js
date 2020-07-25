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
const Order_1 = require("../models/Order");
const item_1 = __importDefault(require("./item"));
const settings_1 = require("../../config/settings");
const lodash_1 = __importDefault(require("lodash"));
let order = {
    add: (data) => {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const entity = new Order_1.Order();
            lodash_1.default.forEach(data, (val, key) => {
                entity[key] = val;
            });
            entity.items = yield item_1.default.addAddressById(data.items.map((m) => m._id), data.items);
            console.log(entity);
            entity.save((err, doc) => __awaiter(this, void 0, void 0, function* () {
                if (err && !doc) {
                    if (err.code === 11000)
                        return resolve(Object.assign({}, settings_1.errorObj, { message: "Phone no. already exist" }));
                    console.log(err);
                    return resolve(Object.assign({}, settings_1.errorObj, { message: "Error Saving order Details" }));
                }
                return resolve(Object.assign({}, settings_1.successObj, { message: "order added successfully", data: doc }));
            }));
        }));
    },
    updateById: (_id, data) => {
        return new Promise((resolve) => {
            Order_1.Order.findByIdAndUpdate(_id, Object.assign({}, data))
                .exec((err, result) => {
                if (err)
                    return resolve(Object.assign({}, settings_1.errorObj, { message: 'Error while updating' }));
                return resolve(Object.assign({}, settings_1.successObj, { message: 'oreder updated' }));
            });
        });
    },
    list: (data) => {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            let matchObj = Object.assign({}, data);
            let countQuery = Order_1.Order.count(Object.assign({}, matchObj));
            Order_1.Order.find(Object.assign({}, matchObj)).lean().exec((error, doc, success) => __awaiter(this, void 0, void 0, function* () {
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
                        return resolve(Object.assign({}, settings_1.successObj, { message: "Order List", total: totalData, data: doc }));
                    });
                }
            }));
        }));
    },
};
exports.default = order;
//# sourceMappingURL=order.js.map