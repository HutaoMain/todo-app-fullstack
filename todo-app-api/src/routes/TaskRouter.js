const router = require("express").Router();
const TaskController = require("../controllers/TaskController");

router.post("/create", TaskController.createTask);

router.get("/list/:email", TaskController.getTaskListByEmail);

router.get("/:id", TaskController.getTaskById);

router.put("/update/:id", TaskController.updateTaskById);

router.delete("/delete/:id", TaskController.deleteTaskById);

module.exports = router;
