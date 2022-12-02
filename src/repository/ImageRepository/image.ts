import { ImageType } from "../../interfaces/imageType";
import Image from "../../models/imageModel";

export class ImageRepository {
  public async uploadImage(image: ImageType) {
    const newImage = new Image(image);
    await newImage
      .save()
      .then((result: object) => {
        return result;
      })
      .catch((error: Error) => {
        return error;
      });
  }
}