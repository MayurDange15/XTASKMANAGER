const Task = require("../models/task.model");

class TaskService {
  find = async () => {
    const tasks = await Task.find({});
    return tasks;
  };

  create = async (body) => {
    const task = new Task(body);
    const savedTask = await task.save();
    return savedTask;
  };

  update = async (id, body) => {
    const updatedTask = await Task.findByIdAndUpdate(id, body, {
      new: true,
    });
    return updatedTask;
  };

  delete = async (id) => {
    const deletedTask = await Task.findByIdAndDelete(id);
    return deletedTask;
  };
}

module.exports = TaskService;
