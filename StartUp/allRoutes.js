const express = require("express");

const customer = require("../Routes/customerRoute");
const error = require("../Middlewares/error");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended:true }));
  app.use("/api/v1/customer", customer);
  app.use(error);
};