const app = require("./app");
const { connectMongoose } = require("./db/connection");

(async () => {
  try {
    await connectMongoose();
     app.listen(process.env.PORT, () => {
       console.log(`Server running. Use our API on port: ${process.env.PORT}`);
     });
    console.log("Database connection successful");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
})();
