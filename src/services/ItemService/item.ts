import { ItemType } from "../../interfaces/itemType";
import Item from "../../models/itemModel";
import { ItemRepository } from "../../repository/ItemRepository/item";

export const createItemService = async (newItem: ItemType) => {
  await new ItemRepository()
    .createItem(newItem)
    .then((item) => {
      return item;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
};

export const getItemsService = async () => { 
  const items = await new ItemRepository().getAllItems();
  return items;
};
