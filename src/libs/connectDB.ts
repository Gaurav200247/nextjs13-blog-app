import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI as string)
      .then(() => console.log("DB connected..."))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
