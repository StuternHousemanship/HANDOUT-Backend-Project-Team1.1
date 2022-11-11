import mongoose, { Schema } from "mongoose";
import { ItemType } from "../interfaces/itemType";
import User from "./userModel";

const itemSchema = new Schema<ItemType>(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        location: { type: String, required: true },
        category: { type: String, required: true },
        status: { type: String, required: true },
        userId: [{ type: Schema.Types.ObjectId, ref: User }]
    },
    { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
export default Item;
