const express = require("express");

const customer = require("../Routes/customerRoute");
const admin = require("../Routes/adminRoute");
const error = require("../Middlewares/error");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended:true }));
  app.use("/api/v1/customer", customer);
  app.use("/api/v1/admin", admin);
  app.use(error);
};