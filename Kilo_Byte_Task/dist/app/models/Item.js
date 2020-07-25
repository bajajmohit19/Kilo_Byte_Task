"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const itemSchema = new mongoose_1.default.Schema({
    addresses: [String],
    categoryName: String,
    itemName: String
});
exports.Item = mongoose_1.default.model("items", itemSchema);
//# sourceMappingURL=Item.js.map