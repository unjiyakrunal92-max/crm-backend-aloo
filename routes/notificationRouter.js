const express = require("express");

const notificationRouter = express.Router();

const authController = require("../controller/authController");
const notificationController = require("../controller/notificationController");

notificationRouter.get(
  "/",
  authController.verifytoken,
  notificationController.getNotifications
);

notificationRouter.put(
  "/:id/read",
  authController.verifytoken,
  notificationController.markAsRead
);

module.exports = notificationRouter;