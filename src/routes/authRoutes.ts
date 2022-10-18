import { Application } from "express";
import {
    authenticate,
    createUser,
    verifyUserEmail,
} from "../controllers/authController";

export const authRoute = (app: Application) => {
    app.post("/auth/signup", createUser);
    app.get("/auth/confirm/:verificationCode", verifyUserEmail);
    app.post("/auth/login", authenticate);
};

export default authRoute;
