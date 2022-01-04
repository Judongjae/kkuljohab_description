import mongoose from "mongoose";
//mongoose 모듈을 쓰겠다.

const postSchema = new mongoose.Schema(
  // postSchema는 새로운 몽구스 스키마이다. 그 구성은 아래와 같다.
  {
    postId: {
      type: String,
      required: false, //
      unique: false,
    },
    postTitle: {
      type: String,
      required: false,
      unique: false,
    },
    postContent: {
      type: String,
      required: false,
      unique: false,
    },
  },
  { versionKey: false }
);

const Post = mongoose.model("Post", postSchema);

export { Post, Like };
