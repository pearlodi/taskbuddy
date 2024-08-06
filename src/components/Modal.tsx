import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

interface TodoModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (text: string, description: string, priority: "low" | "medium" | "high", dueDate?: string) => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ open, onClose, onAdd }) => {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [dueDate, setDueDate] = useState<string | undefined>("");

  const handleAddClick = () => {
    if (text.trim()) {
      onAdd(text, description, priority, dueDate);
      setText("");
      setDescription("");
      setPriority("low");
      setDueDate("");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Todo</DialogTitle>
      <DialogContent>
        <input
          autoFocus
          placeholder="Todo Text"
          value={text}
          onChange={(e) => setText(e.target.value)} 
          className="inputs mt-3"
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} 
          className="inputs mt-3"
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
            label="Priority"
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          label="Due Date"
          type="date"
          fullWidth
          variant="outlined"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddClick} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TodoModal;
