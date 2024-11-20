import { UserLogin } from "../UserLogin/Login.Models.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import {
  accessTokenOptions,
  logoutOptions,
  refreshTokenOptions,
} from "../Utils/Options.js";
const generate_AccessToken_And_RefreshToken = async (userId) => {
  try {
    const userlogin = await UserLogin.findById(userId);
    console.log(
      `User models instance of that member. Check mem is same using id ${userlogin._id} and ${userlogin.userName}`
    );

    const accessToken = userlogin.generateAccessToken();
    const refreshToken = userlogin.generateRefreshToken();

    //To save refresh token inside database
    userlogin.refreshToken = refreshToken;
    await userlogin.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Error in generating access and refresh token:-", error);
  }
};

//Register Controller
const registerUser = async (req, res) => {
  const { userName, userPassword } = req.body;

  if (!userName || !userPassword) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "All fields required"));
  }

  // 3. Check if the user already exists
  const existingUser = await UserLogin.findOne({ userName });
  if (existingUser) {
    return res
      .status(409)
      .json(
        new ApiResponse(409, null, "User already registered. Please log in.")
      );
  }

  const user = await UserLogin.create({ userName, userPassword });

  const createdUser = await UserLogin.findById(user._id).select(
    "-userPassword -refreshToken"
  );

  //If created user fails
  if (!createdUser) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          "Something went wrong while registering the user"
        )
      );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User Registered successfully."));
};

//Login Controller
const loginUser = async (req, res) => {
  const { userName, userPassword } = req.body;

  // 1. Check if all fields are entered
  if (!userName || !userPassword) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "All fields are required"));
  }

  //Check user is exist or not
  const userlogin = await UserLogin.findOne({ userName });

  if (!userName) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "User not found. Please register!"));
  }

  //validate password
  const isPasswordValid = await userlogin.isPasswordCorrect(userPassword);

  if (!isPasswordValid) {
    return res.status(401).json(new ApiResponse(401, null, "Invald Password!"));
  }

  const { accessToken, refreshToken } =
    await generate_AccessToken_And_RefreshToken(userlogin._id);

  //Send access and refresh token to user
  const loggedInUser = await UserLogin.findById(userlogin._id).select(
    "-userPassword -refreshToken"
  );

  //6. Return access and refresh token to user
  /* return res
    .status(200)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
  );
  */

  //Without refresh token
  return res
    .status(200)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
        },
        "User logged In Successfully"
      )
    );
};

const logOutUser = asyncHandler(async (req, res) => {
  await UserLogin.findByIdAndUpdate(
    req.userlogin._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  // return res
  //   .status(200)
  //   .clearCookie("refreshToken", options)
  //   .clearCookie("accessToken", options)
  //   .json(new ApiResponse(200, {}, "User logged Out"));

  return res
    .status(200)
    .clearCookie("accessToken", logoutOptions)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

//My test routes
const testController = asyncHandler(async (req, res, next) => {
  const userName = req.userlogin.userName;
  const testUserName = "This is testing...";

  return res
    .status(200)
    .clearCookie("accessToken", logoutOptions)
    .json(
      new ApiResponse(
        200,
        { testUserName: testUserName, userName: userName },
        "This is tesusername response from controller"
      )
    );
});

//Display user related data

export { registerUser, loginUser, logOutUser, testController };
