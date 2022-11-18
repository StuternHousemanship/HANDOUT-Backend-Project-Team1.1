import { ImageType } from "../../interfaces/imageType";

import { ImageRepository } from "../../repository/ImageRepository/image";
const store = new ImageRepository();

export const uploadImageService = async (newImage: ImageType) => {
  await store
    .uploadImage(newImage)
    .then((image) => {
      return image;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
};