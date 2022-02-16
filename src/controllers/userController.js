import User from "../models/User.js";
import jwtToken from "jsonwebtoken";
import bcrypt from "bcrypt";

//회원가입API
export const signup = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  const re_userEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  const re_userPassword = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{5,20}$/;

  if (userEmail.search(re_userEmail) == -1) {
    return res.status(400).send({
      errorMessage: "이메일 형식 맘에 안듬.",
    });
  } else if (userPassword.search(re_userPassword) == -1) {
    return res.status(400).send({
      errorMessage: "비밀번호의 형식이 일치하지 않데!",
    });
  }
  try {
    const isemailExisting = await User.find({
      userEmail,
    });
    if (isemailExisting.length) {
      return res.status(400).send({
        result: "failure",
        msg: "이미 존재함 ㅅㄱ",
      });
    }
    const hashedPassword = await bcrypt.hash(userPassword, 5);

    const newUser = {
      userEmail,
      userPassword: hashedPassword,
    };
    await User.create(newUser);
    return res.status(200).send({ result: "success", msg: "회원강빗어공" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ result: "failure", msg: "DB정보조회시래패" });
  }
};

//로그인 API
export const login = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  console.log(userEmail, userPassword);
  try {
    const user = await User.findOne({ userEmail });
    const isPwMatched = await bcrypt.compare(userPassword, user.userPassword);
    console.log(token);
    if (!isPwMatched)
      return res.status(400).send({ result: "failure", msg: "아이디비번틀림" });
    const { _id } = user;
    const token = jwtToken.sign({ _id }, "honeytip-secret-key");
    return res
      .status(200)
      .send({ result: "success", msg: "로그인 완료", token });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ result: "failure", msg: "DB정보조회시류ㅐ패" });
  }
};
// const YOUR_SECRET_KEY = process.env.SECRET_KEY;

// exports.createToken = async function (req, res, next) {
//   try {
//     const user = await User.find(req.body);
//     if (user.length) {
//       const token = jwt.sign(
//         {
//           user_id: user[0].user_id,
//         },
//         YOUR_SECRET_KEY,
//         {
//           expiresIn: "1h",
//         }
//       );

//       res.cookie("user", token);
//       res.status(201).json({
//         result: "ok",
//         token,
//       });
//     } else {
//       res.status(400).json({ error: "invaild user" });
//     }
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// };

// exports.createNewUser = async function (req, res, next) {
//   try {
//     const user = await new User(req.body).save();

//     res.status(201).json({
//       result: "ok",
//       user: user,
//     });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// };
