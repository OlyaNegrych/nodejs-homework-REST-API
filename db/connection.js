const mongoose = require("mongoose");
const MONGO_URL = 'mongodb+srv://riki:XeNa1909@cluster0.clgwdpw.mongodb.net/PhoneBook?retryWrites=true&w=majority';

const connectMongoose = async () => {
  return mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = { connectMongoose };
