import jwt from "jsonwebtoken";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { UserLogin } from "./Login.Models.js";
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // const token =
    //   req.header("Authorization")?.replace("Bearer ", "") ||
    //   req.cookies?.accessToken;

    const token1 = req.cookies?.accessToken;
    // const token = req.cookies?.refreshToken;
    // console.log(`AccessToken is ${token1}  refresh token is ${token}`);
    console.log(`AccessToken is ${token1}  refresh token is not send`);

    if (!token) {
      return res
        .status(401)
        .json(
          new ApiResponse(
            401,
            null,
            "Unauthorized Request as accessToken not found."
          )
        );
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const userlogin = await UserLogin.findById(decodedToken?._id).select(
      "-userPassword -refreshToken"
    );
    if (!userlogin) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Invalid Access Token"));
    }
    req.userlogin = userlogin;
    next();
  } catch (error) {
    console.log(`Error inside verifyJwt:-`, error);
    return res
      .status(401)
      .json(
        new ApiResponse(401, null, error?.message || "Invalid access token")
      );
  }
});
