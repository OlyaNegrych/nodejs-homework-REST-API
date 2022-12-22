const app = require("./app");
const { connectMongoose } = require("./db/connection");

const start = async () => {
 try {
   await connectMongoose();
   console.log("Database connection successful");
 } catch (error) {
   console.log(error.message);
   process.exit(1);
 }

  app.listen(process.env.PORT, () => {
    console.log(`Server running. Use our API on port: ${process.env.PORT}`);
  });
};

start();
