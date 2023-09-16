const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: [true, "Please provide a sender"],
    },
    message: {
        type: String,
        required: [true, "Please provide a message"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
