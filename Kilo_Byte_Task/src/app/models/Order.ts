import mongoose from "mongoose";
export type OrderDocument = mongoose.Document & {
    items: any[];
    deliveryPersonId: string;
    stage: Stages;
    customerId: string;
    pickupLocations: string[];
}
enum Stages {
    'Task Created',
    'Reached Store',
    'Items Picked',
    'Enroute',
    'Delivered',
    'Canceled',
}
const orderSchema = new mongoose.Schema({
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


export const Order = mongoose.model<OrderDocument>("orders", orderSchema);