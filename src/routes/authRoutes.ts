import { Application } from "express";
import { createUser, verifyUserEmail } from "../controllers/authController";

export const authRoute = (app: Application) => {
  app.post("/auth/signup", createUser);
  app.get("/auth/confirm/:verificationCode", verifyUserEmail);
};
