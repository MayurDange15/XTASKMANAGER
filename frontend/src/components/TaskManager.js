import * as React from "react";
import { Box, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskTable from "./TaskTable";
import TaskModal from "./TaskModal";
import { LoadingIndicator } from "./LoadingIndicator";
import { useTasks, useTaskManager } from "../hooks";
import { deleteTask, markTaskAsDone } from "../service";

export const TaskManager = () => {
  const { tasks, loading, refreshTasks } = useTasks();
  const {
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
  } = useTaskManager();

  const handleMarkAsDone = async (taskId) => {
    try {
      await markTaskAsDone(taskId);
      await refreshTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId);
        await refreshTasks();
      } catch (err) {
        console.error("Error deleting task:", err);
      }
    }
  };

  const handleDownloadFile = (data, contentType) => {
    const blob = new Blob([data], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `task-file-${new Date().toLocaleTimeString()}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {loading ? (
        <LoadingIndicator />
      ) : tasks.length ? (
        <TaskTable
          tasks={tasks}
          onMarkAsDone={handleMarkAsDone}
          onDownloadFile={handleDownloadFile}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="80vh"
        >
          <Typography variant="h4" component="h1" gutterBottom>
            No tasks found!
          </Typography>
        </Box>
      )}
      <TaskModal
        open={open}
        handleClose={handleClose}
        taskData={taskData}
        handleChange={(field, value) =>
          setTaskData((prev) => ({ ...prev, [field]: value }))
        }
        handleSave={() => handleSave(refreshTasks)}
        handleFileChange={handleFileChange}
        file={file}
        isEditing={isEditing}
      />
      <Fab
        aria-label="add"
        color="primary"
        onClick={handleAddClick}
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};
