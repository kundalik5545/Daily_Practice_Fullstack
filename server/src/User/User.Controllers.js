import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { User } from "./User.Models.js";
const loginUser = async (req, res) => {
  const { userId, userPassword } = req.body;

  if ((!userId, !userPassword)) {
    return res
      .status(400)
      .json({ success: false, msg: "All fields are required", data: null });
  }
  if (userId === "test213") {
    if (userPassword === "test123") {
      return res
        .status(200)
        .json({ success: true, msg: "User logged in!", data: null });
    } else {
      return res
        .status(400)
        .json({ success: false, msg: "Check Password!", data: userPassword });
    }
  } else {
    return res
      .status(400)
      .json({ success: false, msg: "Check user Id", data: userId });
  }
};

const userData = asyncHandler(async (req, res, next) => {
  const { fullName, DOB } = req.body;

  if (!fullName && !DOB) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "All fields are required"));
  }

  const user = await User.create({
    fullName,
    DOB,
  });

  return res.status(200).json(new ApiResponse(200, user, "User added"));
});

const getUsers = asyncHandler(async (req, res) => {
  const data = await User.find();

  return res.status(200).json(new ApiResponse(200, data, "All data fetched."));
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User deleted successfully."));
});

export { loginUser, userData, getUsers, deleteUser };
