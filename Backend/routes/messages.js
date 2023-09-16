const express = require("express");
const router = express.Router();
const { getMessages, createMessage } = require("../controllers/messages");
const Authentication = require("../middlewares/Authentication");

router
  .route("/")
  .get(Authentication, getMessages)
  .post(Authentication, createMessage);

module.exports = router;
