const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    DISP: {
      type: String,
      required: true,
    },
    BAT: {
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
      type: String,
      required: true,
    },
    Z: {
      type: Number,
      required: true,
    },
    HORARIO: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Eureka", RegisterSchema);
