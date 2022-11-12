import { Request, Response } from "express";
import { ImageType } from "../../interfaces/imageType";
import { uploadImageService } from "../../services/imageService/image";

export const uploadImage = (req: Request, res: Response) => {
    const imageFile = (req as any).files;
    const { user } = req.user;

    const newImage: ImageType = {
        image: `items/${imageFile[0].filename}`,
        userId: user._id
    };

    uploadImageService(newImage)
        .then(() => {
            res.status(200).json({ message: "New image uploaded", newImage });
        })
        .catch((error) => {
            res.status(400).json(error);
        });
