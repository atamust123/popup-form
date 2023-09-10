import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.DATABASE_URL);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    connection.on("error", (err) => {
      console.log("MongoDB connection error. Check MongoDB config");
      // Check first IP address on MongoDb active users
      process.exit();
    });
  } catch (error) {
    console.error("SOMETHING_WENT_WRONG_ON_MONGODB_CONNECTION", error);
  }
}
