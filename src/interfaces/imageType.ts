import { Types } from "mongoose";

export type ImageType = {
    image: string;
    userId: Types.ObjectId
};