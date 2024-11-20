import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserLoginSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userPassword: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

UserLoginSchema.pre("save", async function (next) {
  if (!this.isModified("userPassword")) return next();

  this.userPassword = await bcrypt.hash(this.userPassword, 10);
  next();
});

UserLoginSchema.methods.isPasswordCorrect = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.userPassword);
};

UserLoginSchema.methods.generateAccessToken = function () {
  try {
    return jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
  } catch (error) {
    console.log("Error in generating accessToken:-", error);
  }
};

UserLoginSchema.methods.generateRefreshToken = function () {
  try {
    return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
  } catch (error) {
    console.log("Error in generating refreshToken:-", error);
  }
};

export const UserLogin = mongoose.model("UserLogin", UserLoginSchema);
