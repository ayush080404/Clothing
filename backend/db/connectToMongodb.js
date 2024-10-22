import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(
      process.env.DB_URI ||
        "mongodb+srv://Admin:CiTAxt9YYIlg1A3F@cluster0.rkdoows.mongodb.net/Web3Shop?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected To Database");
  } catch (err) {
    console.log(err);
  }
};

export default connectToMongoDB;
