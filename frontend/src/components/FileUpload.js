import * as React from "react";
import { Button, IconButton } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import Delete from "@mui/icons-material/Delete";

export const FileUpload = ({ file, handleFileChange }) => (
  <>
    <input
      accept="application/pdf"
      style={{ display: "none" }}
      id="upload-file"
      type="file"
      onChange={handleFileChange}
    />
    <label htmlFor="upload-file">
      <Button
        variant="contained"
        component="span"
        startIcon={<UploadIcon />}
        style={{ marginTop: 16, marginRight: 16 }}
      >
        {file ? file.name : "Upload PDF"}
      </Button>
      {file && (
        <IconButton
          sx={{ paddingTop: 4 }}
          onClick={() => handleFileChange({ target: { files: [] } })}
        >
          <Delete color="error" />
        </IconButton>
      )}
    </label>
  </>
);
