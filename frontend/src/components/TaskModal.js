import * as React from "react";
import { Modal, TextField, Button, Box } from "@mui/material";
import { FileUpload } from "./FileUpload";
import { formatDateForInput } from "../utils";

const TaskModal = ({
  open,
  handleClose,
  taskData,
  handleChange,
  handleSave,
  handleFileChange,
  file,
  isEditing,
}) => (
  <Modal open={open} onClose={handleClose}>
    <Box
      component="form"
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
      }}
    >
      <TextField
        label="Title"
        fullWidth
        required
        margin="normal"
        value={taskData?.title || ""}
        onChange={(e) => handleChange("title", e.target.value)}
      />
      <TextField
        label="Description"
        fullWidth
        required
        margin="normal"
        value={taskData?.description || ""}
        onChange={(e) => handleChange("description", e.target.value)}
      />
      <TextField
        label="Deadline"
        type="date"
        fullWidth
        required
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={formatDateForInput(taskData?.deadline || "")}
        onChange={(e) => handleChange("deadline", e.target.value)}
      />
      {!isEditing && (
        <FileUpload file={file} handleFileChange={handleFileChange} />
      )}
      <Box display="flex" justifyContent="space-between" marginTop={2}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          {isEditing ? "Update" : "Save"}
        </Button>
      </Box>
    </Box>
  </Modal>
);

export default TaskModal;
