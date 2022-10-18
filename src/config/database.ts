import mongoose from "mongoose";


import { ConnectionOptions } from "tls";

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

