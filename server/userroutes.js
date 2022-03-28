const express = require("express");
const registerController = require("./registerController");

const routes = express.Router();

routes.get("/", (req, res) => {
  res.json({ msg: "ola" });
});

routes.post("/LoginAndRegister", registerController.store);

module.exports = routes;