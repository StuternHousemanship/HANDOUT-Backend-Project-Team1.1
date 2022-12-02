import { Types } from "mongoose";


export type ItemType = {
    image : string
    itemId?: string;
    name: string;
    description:string
    condition:string
    itemColor: string
    price: number;
    location: string;
    category?: string;
    status: string;
    shippingOptions?:string
    userId: Types.ObjectId
};