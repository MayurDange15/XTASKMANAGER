import { useState } from "react";
import { createTask, updateTask } from "../service";

export const useTaskManager = () => {
  const [taskData, setTaskData] = useState(null);
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);

  const handleAddClick = () => {
    setIsEditing(false);
    setTaskData({ title: "", description: "", deadline: "", status: "TODO" });
    setFile(null);
    setOpen(true);
  };

  const handleEditClick = (task) => {
    setIsEditing(true);
    setTaskData(task);
    setFile(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTaskData(null);
    setFile(null);
  };

  const handleSave = async (refreshTasks) => {
    const formData = new FormData();
    formData.append("title", taskData.title);
    formData.append("description", taskData.description);
    formData.append("deadline", taskData.deadline);
    formData.append("status", taskData.status);
    if (file) formData.append("pdf", file);

    try {
      if (isEditing) {
        await updateTask(taskData._id, {
          title: taskData.title,
          description: taskData.description,
          deadline: taskData.deadline,
        });
      } else {
        await createTask(formData);
      }
      await refreshTasks();
      handleClose();
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files.length) {
      setFile(event.target.files[0]);
    } else {
      setFile(null);
    }
  };

  return {
    taskData,
    file,
    isEditing,
    open,
    handleAddClick,
    handleEditClick,
    handleClose,
    handleSave,
    handleFileChange,
    setTaskData,
  };
};
