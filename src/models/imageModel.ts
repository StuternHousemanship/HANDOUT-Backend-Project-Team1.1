import mongoose, { Schema } from "mongoose";
import { ImageType } from "../interfaces/imageType";
import User from "./userModel";

const imageSchema = new Schema<ImageType>(
    {
        image: { type: String, default: '/uploads/items/filename.jpeg',  },
        userId: [{ type: Schema.Types.ObjectId, ref: User }]
    },
    { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);
export default Image;