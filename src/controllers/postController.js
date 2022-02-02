import { Post } from "../models/Post.js";
//저 위치의 post를 수입한다.
const postDate = new Date();

function dateFormat(date) {
  let month = date.getMonth() + 1;
  //왜 여기엔 +1을 할까?
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
//이걸 해석해보자

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
    console.log("tt");
    return res.status(200).send({ success: true, newPost: newPost });
  } catch (err) {
    console.log("게시글 등록 기능 중 발생한 에러: ", err);
    return res
      .status(500)
      .send({ success: false, msg: "게시글 등록 중 에러 발생" });
  }
};

export const postfind = async (req, res) => {
  Post.findOne({ _id: req.params.postid }, (err, post) => {
    //하나를 찾고
    if (err) return res.status(500).send({ error: "에러떴슴" });
    //없는경우
    if (!post)
      return res
        .status(400)
        .send({ error: "해당 포스트가 존재하지 않습니다." });
    res.status(200).send(post);
  });
};

export const postupdate = async (req, res) => {
  Post.findOneAndUpdate({ _id: req.params.postid }, (err, post) => {
    //findone 말고 findoneandupdate를 쓸 순 없을까?
    if (err) return res.status(500).send({ error: "수정안됨" });
    if (!post)
      return res
        .status(400)
        .send({ error: "해당 포스트가 존재하지 않습니다." });
    res.status(200).send(post);
  });
};
//제목이 같은 글 다섯개가 있으면 그 이상 같은 제목의 게시글을
//못만들게 하는 함수에서  게시글 하나 만들 때 마다
//데이터베이스를 돌리는건 오버워킹?이다. 이걸
//어찌해야 될까?

export const postdelete = async (req, res, post) => {
  Post.findOneAndDelete({ _id: req.params.postid }, (err, post) => {
    if (err) return res.status(500).send({ error: "에러뜸 ㅅㄱ" });
    if (!post)
      return res.status(400).send({ error: "존재하지 않는 게시물입니다." });
    res.status(200).send({ message: "삭제 완료", post });
  });
};
////
