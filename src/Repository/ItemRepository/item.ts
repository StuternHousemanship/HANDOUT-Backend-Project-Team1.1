import { ItemType } from "../../interfaces/itemType";
import Item from "../../models/itemModel";

export class ItemRepository {
  public async createItem(item: ItemType) {
    const newItem = new Item(item);
    await newItem
      .save()
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
      });
  }
}