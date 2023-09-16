const User = require("../models/User");
const Message = require("../models/Message");

const getMessages = async (req, res) => {
  try {
    const loggedInUserId = req.user.payload.userId;
    const loggedInUser = await User.findById(loggedInUserId);
    if (!loggedInUser) {
      res.status(404).json({ message: "User not found" });
    }
    const messages = await Message.find({});
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMessage = async (req, res) => {
  try {
    const loggedInUserId = req.user.payload.userId;
    const user = await User.findById(loggedInUserId);
    const name = user.firstName + " " + user.lastName;
    const { message } = req.body;
    const newMessage = new Message({ 
        sender: name, 
        message: message });
    user.messages.push(newMessage);
    await user.save();
    await newMessage.save();
    res.status(200).json({ message: "Message created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getMessages, createMessage };
