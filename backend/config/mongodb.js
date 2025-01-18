const mongoose = require("mongoose");

const ConnectDb = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Db is Connected");
  });
  const mongooseUpdatedUri = process.env.MONGO_URI.replace(
    "<PASSWORD>",
    process.env.CLUSTER_CODE
  );
  try {
    await mongoose.connect(mongooseUpdatedUri);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};

module.exports = ConnectDb;
