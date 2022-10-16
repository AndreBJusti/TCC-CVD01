const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    bat: {
      type: Number,
      required: true,
    },
    IDX: {
      type: Number,
      required: true,
    },
    X: {
      type: Number,
      required: true,
    },
    Y: {
      type: Number,
      required: true,
    },
    Z: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("registers", RegisterSchema);
