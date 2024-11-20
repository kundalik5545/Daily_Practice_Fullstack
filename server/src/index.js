import app from "./app.js";
import dotenv from "dotenv";
import connectDb from "./connect.db.js";
dotenv.config({ path: "./.env" });

const PORT = 8000;
app.listen(PORT, () => {
  connectDb()
    .then(() => {
      console.log(`Connected to database on port ${process.env.PORT}`);
    })
    .catch((err) => {
      console.log("Failed to connect database:-", err);
    });
});
