import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    // origin: process.env.CORS_ORIGIN,
    // credentials: true,
    origin: "http://localhost:5175", // Allow only this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    // allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("This is home page");
});

//Importing routes from user.routes.js
import userRoutes from "./User/User.Routes.js";
import loginRoutes from "./UserLogin/Login.Routes.js";

//Redierecting routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/login", loginRoutes);

export default app;
