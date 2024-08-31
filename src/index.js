import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js"

const app = express();

dotenv.config();

//Database connection function calling
connectDB()

app.get((req, res) => {
  res.send("here is the data");
});

app.listen(process.env.PORT, () => console.log("app is working"));
