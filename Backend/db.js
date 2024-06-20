import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const url = `mongodb://127.0.0.1:27017/DealsDray`;
    await mongoose.connect(url); //,{   useNewUrlParser: true, useUnifiedTopology: true,}
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectToDB;
