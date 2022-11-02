import { url } from "inspector";
import mongoose from "mongoose";
import { ConnectionOptions } from "tls";
import { Url, UrlObject } from "url";

mongoose.set("debug", true); // this logs mongo query to terminal

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const database = async () => {
    await mongoose
        .connect(
        "mongodb://localhost:27017/handout",
            connectionParams as ConnectionOptions
        )
        .then(() => {
            console.log("Connected to Handout DB on localhost!");
        })
        .catch((err) => {
            console.error(`Error connecting to the database. n${err}`);
        });
};

export default database;