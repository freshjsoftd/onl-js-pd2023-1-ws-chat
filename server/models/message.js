const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const messageSchema = new Schema(
  {
    author: {
      type: String,
      match: /^[A-Z,А-Я](\w+\s?){1,10}\w+$/,
    },
    body: {
      type: String,
      minlength: 1,
      maxlength: 200,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
