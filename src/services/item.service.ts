import { ItemType } from "../interfaces/itemType";
import { ItemRepository } from "../Repository/item.repo";

const store = new ItemRepository();

export const createItemService = async (newItem: ItemType) => {
    const createItem = await store.createItem(newItem);
    return createItem;
}