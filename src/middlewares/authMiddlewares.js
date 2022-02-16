import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { Post } from "../models/Post.js";

export const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(400).send({
      errorMessage: "로그인 후 사용하세요",
    });
  }
};
