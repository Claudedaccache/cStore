const express = require("express");

const {
  contactUs,
  contactUsAllMsgs,
} = require("../controllers/contactUsController");

const contactUsRouter = express.Router();

//user orders
contactUsRouter.post("/addMessage", contactUs);
contactUsRouter.get("/messages", contactUsAllMsgs);

module.exports = contactUsRouter;
