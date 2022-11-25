import { Types } from "mongoose";


export type ItemType = {
    itemId?: string;
    name: string;
    description:string
    price: number;
    location: string;
    category?: string;
    status: string;
    shippingOptions?:string
    userId: Types.ObjectId
};