import { Router } from "express";
import { verifyJWT } from "../UserLogin/Login.Middlewares.js";
const router = Router();

//Import statement
import {
  loginUser,
  logOutUser,
  registerUser,
  testController,
} from "./Login.Controller.js";

//Navigation section
router.route("/register-user").post(registerUser);
router.route("/login-user").post(loginUser);
router.route("/logout-user").get(verifyJWT, logOutUser);

router.route("/testRoutes").get(verifyJWT, testController);

export default router;
