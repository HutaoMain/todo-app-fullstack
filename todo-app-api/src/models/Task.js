const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    taskName: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tasks", TaskSchema);
