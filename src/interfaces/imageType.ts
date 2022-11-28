import { Types } from "mongoose";

export type ImageType = {
    imageId?:any
    image: string;
    userId: Types.ObjectId
};