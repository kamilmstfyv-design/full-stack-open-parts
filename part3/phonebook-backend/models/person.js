require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URL;

mongoose
  .connect(url, { family: 4 })
  .then((result) => {
    console.log("connected succes");
  })
  .catch((error) => {
    console.log("something wrong");
  });

const perssonSchema = new mongoose.Schema({
  name: String,
  number: String,
});

perssonSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", perssonSchema);
