import express from "express";
//express 모듈을 쓰겠다.
import dotenv from "dotenv";
//dotenv모듈을 쓰겠다.
import mongoose from "mongoose";
//mongoose 모듈을 쓰겠다.
import postRouter from "../src/routes/postRouter.js";

const app = express();
const port = 3000;

app.use("api/v1/post", postRouter);
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Express server has started on port " + port);
});
//에효시발
