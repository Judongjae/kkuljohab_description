//npm run start가 실행 문
import express from "express";
//express 모듈을 쓰겠다.
import dotenv from "dotenv";
//dotenv모듈을 쓰겠다.
import mongoose from "mongoose";
//mongoose 모듈을 쓰겠다.
import postRouter from "../src/routes/postRouter.js";
// 저 위치의 postRouter를 쓰겠다.
dotenv.config();
//dotenv를 사용하겠다.
const app = express();
//app을 express에서 가져오나본데?
const port = 3000;
//3000번 포트사용

app.use(express.json());
//bodyparser에서 .json으로 이루어진 Body를 받아온다.
app.use(express.urlencoded({ extended: false }));
// true를 하면 qs모듈을 사용하고 flase면 query-string 모듈을 사용한다.

app.listen(port, () => {
  console.log("Express server has started on port " + port);
});

try {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }); // 몽고DB에 연결
  const db = mongoose.connection;
  db.on("error", console.error);
  db.once("open", function () {
    //몽고디비 연결
    console.log("Connection to mongod server");
  });
} catch (error) {
  console.log("mongo connect error : ", error);
}

app.use("/api/v1/post", postRouter);
// api/v1/post를 기반으로 쓰는 것들
app.get("/", (req, res) => {
  res.send("Hello World");
}); // "/" 일 때 Hello World를 보낸다.
