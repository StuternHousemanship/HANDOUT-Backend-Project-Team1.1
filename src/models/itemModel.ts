import mongoose, { Schema } from "mongoose";
import { ItemType } from "../interfaces/itemType";

const userSchema = new Schema<ItemType>(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        location: { type: String, required: true },
        category: { type: String, required: true },
        status: { type: String, required: true },
    },
    { timestamps: true }
);

const Item = mongoose.model("Item", userSchema);
export default Item;
