const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json(task);
  } catch (err) {
    console.log(err);
  }
};

const getTaskListByEmail = async (req, res) => {
  const email = req.params.email;
  try {
    const tasks = await Task.find({ email: email });
    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json(task);
  } catch (err) {
    console.log(err);
  }
};

const updateTaskById = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(task);
  } catch (err) {
    console.log(err);
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json(task);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createTask,
  getTaskListByEmail,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
