import { Application } from "express";
import { authenticate, createUser, verifyUserEmail } from "../controllers/userController";

export const userRoute = (app: Application) => {
  app.post("/auth/signup", createUser);
  app.get("/auth/confirm/:verificationCode", verifyUserEmail);
  app.post("/auth/login", authenticate);
};
