import mongoose from "mongoose";

const connectDb = async () => {
  const conn = await mongoose.connect(
    `${process.env.MongoDbName}/${process.env.DB_NAME}`
  );
  // console.log("Database connection response:-", conn);
};

export default connectDb;
