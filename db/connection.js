const mongoose = require("mongoose");

const connectMongoose = async () => {
  return mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = { connectMongoose };
