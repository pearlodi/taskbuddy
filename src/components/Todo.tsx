import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { editTodo, deleteTodo, updateTodoStatus } from "../features/todos/todosSlice";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";

interface TodoProps {
  id: number;
  text: string;
  description: string;
  status: "incomplete" | "inProgress" | "completed";
  dueDate?: string;
  priority: "low" | "medium" | "high";
}

const Todo: React.FC<TodoProps> = ({
  id,
  text,
  description,
  status,
  dueDate,
  priority,
}) => {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);
  const [newDueDate, setNewDueDate] = useState(dueDate);
  const [newPriority, setNewPriority] = useState(priority);
  const [newDescription, setNewDescription] = useState(description);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(
      editTodo({
        id,
        text: newText,
        dueDate: newDueDate,
        priority: newPriority,
        description: newDescription,
        status: selectedStatus
      })
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteTodo(id));
  };

  const handleChangeStatus = (newStatus: "incomplete" | "inProgress" | "completed") => {
    setSelectedStatus(newStatus);
    dispatch(updateTodoStatus({ id, status: newStatus }));
  };

  return (
    <div className="gradient rounded-lg p-4 max-w-full">
      {!isEditing ? (
        <div className="flex-1">
          <span className="dynamic-text capitalize font-bold text-lg">{text}</span>
          <div className="text-gradient text-sm lg:flex justify-between">
            <p>Priority: {priority}</p>
            {dueDate && (
              <span>Due: {dueDate}</span>
            )}
            {description && (
              <div>Description: {description}</div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="inputs-edit"
          />
          <input
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
            className="inputs-edit"
          />
          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value as "low" | "medium" | "high")}
            className="mt-[10px] select"
          >
            <option value="low" className="text-white bg-[#242424] text-sm">Low</option>
            <option value="medium" className="text-white bg-[#242424] text-sm">Medium</option>
            <option value="high" className="text-white bg-[#242424] text-sm">High</option>
          </select>
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="inputs-edit"
          />
          <button onClick={handleSave} className="text-[#45d545] flex items-center text-sm gap-1">
            <FaSave className="cursor-pointer text-[#45d545]" />
            Save
          </button>
        </div>
      )}
      <div className="flex mt-8 items-center justify-between">
        <div className="flex gap-2">
          <label className="flex items-center text-[8px] font-medium">
            <input
              type="radio"
              name="status"
              value="incomplete"
              checked={selectedStatus === 'incomplete'}
              onChange={() => handleChangeStatus('incomplete')}
              className="mr-1"
            />
            <span className="text-[#fff]">Incomplete</span>
          </label>
          <label className="flex items-center text-[8px] font-medium">
            <input
              type="radio"
              name="status"
              value="inProgress"
              checked={selectedStatus === 'inProgress'}
              onChange={() => handleChangeStatus('inProgress')}
              className="mr-1"
            />
            <span className="text-[#fff]">In Progress</span>
          </label>
          <label className="flex items-center text-[8px] font-medium">
            <input
              type="radio"
              name="status"
              value="completed"
              checked={selectedStatus === 'completed'}
              onChange={() => handleChangeStatus('completed')}
              className="mr-1"
            />
            <span className="text-[#fff]">Completed</span>
          </label>
        </div>
        <div className="flex gap-1">
          <FaEdit
            onClick={handleEdit}
            className="cursor-pointer text-[#ffffff6f]"
          />
          <FaTrash
            onClick={handleDelete}
            className="cursor-pointer text-[#ffffff6f]"
          />
        </div>
      </div>
    </div>
  );
};

export default Todo;
