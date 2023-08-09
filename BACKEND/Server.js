const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const App = express();
require("dotenv").config();

const PORT = process.env.PORT || 4000;

App.use(cors());
App.use(bodyParser.json());

const NotesRouter = require("./ROUTES/NotesRoute.js");

//http://localhost:4000/Notes
App.use("/Notes", NotesRouter);

//connect to mongo db
const URL = process.env.MONGODB_URL;
mongoose
  .connect(URL)
  .then(() => {
    // listen to port
    App.listen(PORT, () => {
      console.log(`Connected to db & listening for requests on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
