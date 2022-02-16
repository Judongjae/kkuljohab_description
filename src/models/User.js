import mongoose from "mongoose";

// const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
    },
    userPassword: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

export default User;
