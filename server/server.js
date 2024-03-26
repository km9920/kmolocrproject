import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoute.js"
import uploadRoute from "./routes/uploadRoute.js"

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(() => {

    console.log("DB connected successfully")

    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`)
    })

}).catch(err => console.log(err));

app.use("/api/user", userRoute);
app.use("/api/uploads", uploadRoute);