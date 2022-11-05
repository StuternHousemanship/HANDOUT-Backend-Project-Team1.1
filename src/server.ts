import express, { Application, Request, Response } from "express";
import cors from "cors";
import * as dotenv from 'dotenv'
import database from "./config/database";
import { authRoute } from "./routes/authRoutes";
import userRouter from './routes/userProfile';

import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

dotenv.config();

const app: Application = express();
const port: number | string = process.env.PORT || 3000;

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Handout API",
            version: "1.0.0",
            description: "Handout Express API documentation",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
            {
                url: "http://localhost:5000",
            },
        ],
    },
    apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsDoc(options);

database().catch((err) => console.error(err));
app.use(cors({ origin: "http://localhost:5000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

authRoute(app);
app.use("/",userRouter)

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Welcome to Housemanship Handout API!");
});

app.get("*", (req: Request, res: Response) => {
    res.status(400).send("This route does not exist");
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});

export default app;
