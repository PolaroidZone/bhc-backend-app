const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

//Cors for cross origin allowance
app.use(cors());

//Bodyparser middleware for parsing JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const auth = require("./routes/Auth");
const account = require("./routes/Account");

//Server routes
app.get("/", (req, res) => res.send("Hello BHC hackathon!"));
app.use("/auth", auth);
app.use("/account", account);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
