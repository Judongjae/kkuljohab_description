import express from "express";
import {
  //logincheck,
  signup,
  //checkemail,
  //checknick,
  login,
  //logout,
  //me,
  //profilepatch,
} from "../controllers/userController.js";
const userRouter = express.Router();

//userRouter.get("/logincheck", authMiddleware, logincheck);
userRouter.post("/signup", signup);
userRouter.post("/login", login);
// userRouter.get("/logout", authMiddleware, logout);

export default userRouter;
