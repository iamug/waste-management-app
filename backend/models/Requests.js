const mongoose = require("mongoose");
const User = require("./Users");

const RequestSchema = new mongoose.Schema(
  {
    Id: {
      type: String,
      required: true,
      unique: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Request = mongoose.model("requests", RequestSchema);
