import { Application } from "express";
import { createItem } from "../Controllers/item.controller";

export const itemRoute = (app: Application) => {
    app.post("/item", createItem);
};

export default itemRoute;
