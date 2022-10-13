/**
 * Title: Login Authentication System
 * Description: A manual login authentication system with security
 * Author: Hasibul Islam
 * Date: 05/10/2022
 */

/* external imports */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const colors = require("colors");

/* internal imports */
const errorHandler = require("./middlewares/error.middleware");

/* router level connection */
const router = require("./routes/user.route");

/* application level connection */
const app = express();
const port = process.env.PORT || 5000;

/* middleware connection */
app.use(express.json());
app.use(cors());
app.use(express.static("avatars"));

/* router connection */
app.use(router);

/* global error handler */
app.use(errorHandler);

/* db connection */
mongoose
  .connect(process.env.DB_URI, {
    dbName: "manual-login-authentication",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(colors.yellow.bold("Success: establishing DB connection"))
  )
  .catch((error) => console.log(colors.red.underline(`Error: ${error.name}`)));

/* enable connection */
app.get("/", (req, res) => {
  try {
    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "The request is OK",
    });
  } catch (error) {
    res.status(204).json({
      acknowledgement: false,
      message: "No Content",
      description:
        "The request has been successfully processed, but is not returning any content",
    });
  }
});

/* enable port */
app.listen(port, () => {
  console.log(colors.cyan.bold(`Success: listening on port ${port}`));
});
