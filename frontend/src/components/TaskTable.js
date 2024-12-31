import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Chip,
  Paper,
} from "@mui/material";
import { Edit, Download, Delete, CheckCircle } from "@mui/icons-material";
import { formatDate, getStatus } from "../utils";

const TaskTable = ({
  tasks,
  onMarkAsDone,
  onDownloadFile,
  onEdit,
  onDelete,
}) => (
  <TableContainer component={Paper} sx={{ marginTop: "22px" }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Deadline</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task._id}>
            <TableCell>
              <Tooltip title={task.title}>
                <span
                  style={{
                    display: "block",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {task.title}
                </span>
              </Tooltip>
            </TableCell>
            <TableCell sx={{ maxWidth: 250, overflow: "hidden" }}>
              <Tooltip title={task.description}>
                <span
                  style={{
                    display: "block",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {task.description}
                </span>
              </Tooltip>
            </TableCell>
            <TableCell>
              {formatDate(task.deadline)}
              <br />
              <code>{getStatus(task.deadline, task.status)}</code>
            </TableCell>
            <TableCell>
              <Chip
                label={task.status}
                color={task.status === "DONE" ? "success" : "warning"}
              />
            </TableCell>
            <TableCell>
              {task.status === "TODO" && (
                <IconButton onClick={() => onMarkAsDone(task._id)}>
                  <CheckCircle color="success" />
                </IconButton>
              )}
              {task.linkedFile && (
                <IconButton
                  onClick={() =>
                    onDownloadFile(
                      new Uint8Array(task.linkedFile.data.data),
                      task.linkedFile.contentType
                    )
                  }
                >
                  <Download color="primary" />
                </IconButton>
              )}
              <IconButton onClick={() => onEdit(task)}>
                <Edit color="secondary" />
              </IconButton>
              <IconButton onClick={() => onDelete(task._id)}>
                <Delete color="error" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default TaskTable;
