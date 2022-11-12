import express, { Application, Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import database from "./config/database";
import { authRoute } from "./routes/authRoutes";
import userRouter from "./routes/userProfile";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import itemRouter from "./routes/itemRoute";
import path from "path";
import cookieParser from 'cookie-parser';
import imageRouter from "./routes/imageRoute";

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
        url: "http://localhost:5000",
      },
      {
        url: "https://handout.beargaze.com",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsDoc(options);

database().catch((err) => console.error(err));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());

authRoute(app);
app.use("/", itemRouter);
app.use("/", userRouter);
app.use("/", imageRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to Housemanship Handout API!\nGo to /api-docs to get started");
});

app.get("*", (req: Request, res: Response) => {
  res.status(400).send("This route does not exist");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

export default app;
