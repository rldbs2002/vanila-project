import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO as string);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Connection failed!");
  }
};

export default connect;
