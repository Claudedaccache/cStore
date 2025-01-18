const contactUsModel = require("../models/contactUsModel");

// POST route for saving a contact message
const contactUs = async (req, res) => {
  const { name, familyName, email, number, message } = req.body;

  try {
    const newMessage = new contactUsModel({
      name,
      familyName,
      email,
      message,
      number,
    });
    console.log({ newMessage });

    await newMessage.save();
    res
      .status(201)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Error saving message" });
  }
};

// GET route to fetch all messages
const contactUsAllMsgs = async (req, res) => {
  try {
    const messages = await contactUsModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Error fetching messages" });
  }
};

module.exports = { contactUsAllMsgs, contactUs };
