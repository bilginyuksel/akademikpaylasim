require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const ProfessionController = require("./src/controllers/profession");
const ClauseController = require("./src/controllers/clause");
const SubclauseController = require("./src/controllers/subclause");

app.listen(3001, 'localhost', () => {
  console.log("App started");
});

//Enable all CORS Requests
app.use(cors());

app.use(express.json());
app.use("/professions", ProfessionController);
app.use("/clausies", ClauseController);
app.use("/subclausies", SubclauseController);

module.exports = app;
