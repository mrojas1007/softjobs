const express = require("express");
const app = express.Router();
const {
    registerUser,
    getUser,
    validateUser
} = require("../src/controllers/softJobsController.js")

app.get("/usuarios", validateUser)
app.post("/usuarios", registerUser);
app.post("/login", getUser);

module.exports = app;