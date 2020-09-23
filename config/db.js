const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify:false
    });
    console.log("mongo db connected");
  } catch (err) {
    console.error(err.message);
    console.log("mongo db error");
    process.exit(1);
  }
};
module.exports = connectDB;
