import { Application } from "express";
import {
    authenticate,
    create,
    verifyUserEmail,
} from "../Controllers/Auth/authController";

export const authRoute = (app: Application) => {
    app.post("/auth/signup", create);
    // app.get("/auth/confirm/:verificationCode", verifyUserEmail);
    app.post("/auth/confirm", verifyUserEmail);
    app.post("/auth/login", authenticate);
};

export default authRoute;
