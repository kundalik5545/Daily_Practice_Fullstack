import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    DOB: {
      type: Date,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "UserLogin",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
