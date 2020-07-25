import mongoose from "mongoose";
export type ItemDocument = mongoose.Document & {
    categoryName: String;
    addresses: string[];
    itemName: string;
}

const itemSchema = new mongoose.Schema({
    addresses: [String],
    categoryName: String,
    itemName: String
});


export const Item = mongoose.model<ItemDocument>("items", itemSchema);