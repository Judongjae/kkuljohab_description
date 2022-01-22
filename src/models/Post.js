import mongoose from "mongoose";
//mongoose 모듈을 쓰겠다.

const postSchema = new mongoose.Schema(
  // postSchema는 새로운 몽구스 스키마이다. 그 구성은 아래와 같다.
  {
    postTitle: {
      type: String,
    },
    postContent: {
      type: String,
    },
    currentDate: {
      type: String,
    },
  },
  { versionKey: false }
  //postman에서 보이는 걸리적 거리던 버젼키를 없앰
);

const Post = mongoose.model("Post", postSchema);
//이게 뭔소리일까?
//Post라는 객체를 만들겠다는 뜻?
//이건 일종의 틀 인건가?
export { Post };
//post를 내보낸다.
//Post 모델을 참고할 수 있게 한다.
//위 객체를 사용할 수 있게한다?
