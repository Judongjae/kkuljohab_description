//import express from "express";
import {
  postlist,
  postcreate,
  postfind,
  postupdate,
  postdelete,
} from "../controllers/postController.js";

postRouter.get("/", postlist);
postRouter.post("/", postcreate);
postRouter.get("/", postfind);
postRouter.patch("/", postupdate);
postRouter.patch("/", postdelete);

export default postRouter;
