import { Router } from "express";
import {
  deleteUser,
  getUsers,
  loginUser,
  userData,
} from "../User/User.Controllers.js";
import { validateMongooseID } from "./User.Middleware.js";

const router = Router();

//Setting routing here
router.route("/login").post(loginUser);
router.route("/addUser").post(userData);
router.route("/getUsers").get(getUsers);
router.route("/:id").delete(validateMongooseID, deleteUser);

//Some secured routes

export default router;
