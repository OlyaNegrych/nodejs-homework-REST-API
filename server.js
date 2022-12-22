const app = require("./app");
const { connectMongoose } = require("./db/connection");

const start = async () => {
  await connectMongoose();
  console.log("Database connection successful");

  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
  });
};

start();
