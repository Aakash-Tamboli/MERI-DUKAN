import mongoose from "mongoose";
import dotEnv from "dotenv";

dotEnv.config();

export async function connectDB(app) {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    const PORT = process.env.PORT || 5000;
    const connection = await mongoose.connect(MONGO_URI);
    app.listen(5000, function () {
      console.log(`HTTP Server is listening at ${PORT}...`);
      console.log(`MongoDB connected with ${connection.connection.host}`);
    });
  } catch (error) {
    console.log("Error connecting with to MongoDB", error.message);
    process.exit(1); // 1 means failed
  }
}
