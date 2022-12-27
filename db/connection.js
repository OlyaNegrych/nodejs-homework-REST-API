const mongoose = require("mongoose");

const connectMongoose = async () => {
  //  mongoose.set("strictQuery", false);
  return mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// const connectMongo = async () => {
//   mongoose.set("strictQuery", false);
//   mongoose.connect(process.env.MONGO_CONNECTION_DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// };

module.exports = { connectMongoose };
