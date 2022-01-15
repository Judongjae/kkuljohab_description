import { Post } from "../models/Post.js";

const postDate = new Date();

function dateFormat(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  hour = hour >= 10 ? hour : "0" + hour;
  minute = minute >= 10 ? minute : "0" + minute;
  second = second >= 10 ? second : "0" + second;
  return (
    date.getFullYear() +
    ". " +
    month +
    ". " +
    date +
    ". " +
    hour +
    ". " +
    minute +
    ". " +
    second
  );
}

export const postcreate = async (req, res) => {
  const post = new Post();
  try {
    const { postTitle, postContent } = req.body;
    let currentDate = dateFormat(postDate);
    const newPost = await Post.create({
      postTitle,
      postContent,
      currentDate,
    });
    return res.status(200).send({ success: true, newPost: newPost });
  } catch (err) {
    console.log("게시글 등록 기능 중 발생한 에러: ", err);
    return res
      .status(500)
      .send({ success: false, msg: "게시글 등록 중 에러 발생" });
  }
};

export const postfind = async (req, res) => {
  console.log(req.params.postid);
  Post.findOne({ _id: req.params.postid }, (err, post) => {
    if (err) return res.status(500).send({ error: "못찾겠음" });
    if (!post)
      return res
        .status(400)
        .send({ error: "해당 포스트가 존재하지 않습니다." });
    res.status(200).send(post);
  });
};

// export const postupdate = async (req, res) => {
//   Post.findOne({ _id: req.params.postid }, (err, post) => {
//     if(err) return res.status(500).send({ error: "Datebase Failure!"})
//   });
//   try {
//     const { postTitle, postContent } = req.body;
//   } catch {}
// };
