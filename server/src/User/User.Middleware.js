import mongoose from "mongoose";

const validateMongooseID = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  next();
};

export { validateMongooseID };
