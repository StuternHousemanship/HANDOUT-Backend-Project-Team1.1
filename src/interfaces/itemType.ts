import { Types } from "mongoose";

export type ItemType = {
    name: string;
    price: number;
    location: string;
    category: string;
    status: string;
    userId: Types.ObjectId
};