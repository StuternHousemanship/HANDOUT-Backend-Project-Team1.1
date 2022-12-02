import mongoose, { Schema } from "mongoose";
import { ItemType } from "../interfaces/itemType";
import Image from "./imageModel";
import User from "./userModel";
const itemSchema = new Schema<ItemType>(
    {
        image: { type: String, required: true},
        name: { type: String, required: true },
        description: { type: String, required: false },
        condition: { type: String, required: false,
        enum:["new", "used less than 5 times", "used more than 5 times", "old", "damaged"], default:'new' },
        price: { type: Number, required: true },
        location: { type: String, required: true, enum: ['town', 'city', 'country'],  default:'town'},
        category: { type: String, required: true,
        enum: ['books','film', 'tv & music', 'games','electronics & computers ','phones & gadgets', 'home', 'garden', 'pets', 'DIY','toys', 
        'children & baby','clothing', 'shoes', 'accessories','jewellery','sports','outdoors', 'health', 'beauty ', 'household items',
            'automobile & parts', 'food','others '],
        default:'others' },
        status: { type: String, required: true },
        itemColor: { type: String, required: true },
        shippingOptions: { type: String,required: true, enum:['Delivery', 'Pick up', 'both'], default:'Delivery' },
        userId: { type: Schema.Types.ObjectId, ref: User }
    },


    { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
export default Item;

