"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Itask {
  _id: string;
  email: string;
  taskName: string;
  done: boolean;
}

export default function Todo({ email }: { email: string }) {
  const [tasks, setTasks] = useState<Itask[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [updateTask, setUpdateTask] = useState<string>("");

  const createTask = async () => {
    try {
      await axios.post(`http://localhost:5000/api/task/create`, {
        taskName: newTask,
        email: email,
      });
      setNewTask("");
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/task/list/${email}`
      );
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/task/delete/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const startUpdate = (taskId: string) => {
    setSelectedTask(taskId);
    const taskToUpdate = tasks.find((task) => task._id === taskId);
    if (taskToUpdate) {
      setUpdateTask(taskToUpdate.taskName);
    }
  };

  const cancelUpdate = () => {
    setSelectedTask(null);
    setUpdateTask("");
  };

  const updateTaskName = async () => {
    try {
      await axios.put(`http://localhost:5000/api/task/update/${selectedTask}`, {
        taskName: updateTask,
      });
      fetchTasks();
      cancelUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-gray-100 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">TODO App</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="mb-2 p-2 border rounded"
      />
      <button
        onClick={createTask}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>
      <ul className="mt-4">
        {tasks.map((task) => (
          <li key={task._id} className="flex items-center justify-between mb-2">
            {selectedTask === task._id ? (
              <>
                <input
                  type="text"
                  value={updateTask}
                  onChange={(e) => setUpdateTask(e.target.value)}
                  className="mr-2 p-2 border rounded"
                />
                <button
                  onClick={updateTaskName}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={cancelUpdate}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                {task.taskName}
                <div>
                  <button
                    onClick={() => startUpdate(task._id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
