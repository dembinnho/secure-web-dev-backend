
require("dotenv").config();
const express = require("express");
const locationsController = require("./src/locations/locations.controller");
const usersController = require("./src/users/users.controller");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./src/authentication/local.strategy");
require("./src/authentication/jwt.strategy");
const passport = require("passport");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors("*"));

// Protect all /locations route with JWT Authentication
app.use(
    "/locations",
    passport.authenticate("jwt", { session: false }),
    locationsController
);
app.use("/users", usersController);

app.get("/", (req, res) => res.status(200).json({ message: "Hello World !" }));

async function main() {
  //await mongoose.connect("mongodb://172.22.0.2/16");
  //await mongoose.connect("mongodb://172.22.0.2/16");

  await mongoose.connect("mongodb://127.0.0.1:27017/");
  //await mongoose.connect("mongodb+srv://admin:admin311@cluster0.xifjfyo.mongodb.net/?retryWrites=true&w=majority");

  console.log("Connected to Mongo Database");
  app.listen(port, () => {
    console.log(
        `API listening on port ${port}, visit http://localhost:${port}/`
    );
  });
}

main();

