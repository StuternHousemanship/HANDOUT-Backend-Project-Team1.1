import { ItemType } from "../../interfaces/itemType";
import { ItemRepository } from "../../repository/ItemRepository/item";

const store = new ItemRepository();

export const createItemService = async (newItem: ItemType) => {
  await store
    .createItem(newItem)
    .then((item) => {
      return item;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
};
