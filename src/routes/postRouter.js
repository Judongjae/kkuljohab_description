import express from "express";
//express를 쓴다.
import {
  //postlist,
  postcreate,
  postfind,
  postupdate,
  postdelete,
} from "../controllers/postController.js";
//postController.js에서 위의 것을 받아온다
const postRouter = express.Router();
//router를 express.router에서 받아온다.

//postRouter.get("/", postlist);
postRouter.post("/", postcreate);
postRouter.get("/:postid", postfind);
postRouter.patch("/postupdate/:postid", postupdate);
postRouter.delete("/postdelete/:postid", postdelete);

export default postRouter;
