import { Application } from "express";
import { createUser } from "../controllers/userController";

export const userRoute = (app: Application) => {
  app.post("/user", createUser);
};
