"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var Stages;
(function (Stages) {
    Stages[Stages["Task Created"] = 0] = "Task Created";
    Stages[Stages["Reached Store"] = 1] = "Reached Store";
    Stages[Stages["Items Picked"] = 2] = "Items Picked";
    Stages[Stages["Enroute"] = 3] = "Enroute";
    Stages[Stages["Delivered"] = 4] = "Delivered";
    Stages[Stages["Canceled"] = 5] = "Canceled";
})(Stages || (Stages = {}));
const orderSchema = new mongoose_1.default.Schema({
    items: [{ type: Object }],
    deliveryPersonId: { type: String, ref: 'users', required: true },
    stage: {
        type: String, default: 'Task Created', enum: ['Task Created',
            'Reached Store',
            'Items Picked',
            'Enroute',
            'Delivered',
            'Canceled']
    },
    customerId: { type: String, required: true, ref: 'users' },
    pickupLocations: [String]
});
exports.Order = mongoose_1.default.model("orders", orderSchema);
//# sourceMappingURL=Order.js.map