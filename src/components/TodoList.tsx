import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { addTodo, reorderTodos } from "../features/todos/todosSlice";
import { setSearchTerm } from "../features/filters/filtersSlice";
import Todo from "./Todo";
import { Button } from "@mui/material";
import TodoModal from "./Modal";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BarChartIcon from '@mui/icons-material/BarChart';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Typography, Box } from '@mui/material';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import ColorSelector from "./ColorSelector";

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const searchTerm = useSelector((state: RootState) => state.filters.searchTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearchTerm(debouncedSearchTerm));
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedSearchTerm, dispatch]);

  const handleAddTodo = (
    text: string,
    description: string,
    priority: "low" | "medium" | "high",
    dueDate?: string
  ) => {
    const newTodo = {
      id: Date.now(),
      text,
      description,
      priority,
      dueDate,
      status: "incomplete" as "incomplete",
    };
    dispatch(addTodo(newTodo));
    setModalOpen(false);
  };

  const incompleteTodos = todos.filter(
    (todo) => todo.status === "incomplete"
  );
  const inProgressTodos = todos.filter((todo) => todo.status === "inProgress");
  const completedTodos = todos.filter((todo) => todo.status === "completed");

  const filteredIncompleteTodos = incompleteTodos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredInProgressTodos = inProgressTodos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredCompletedTodos = completedTodos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    dispatch(
      reorderTodos({
        sourceIndex: source.index,
        destinationIndex: destination.index,
        sourceList: source.droppableId as 'incomplete' | 'inProgress' | 'completed',
        targetList: destination.droppableId as 'incomplete' | 'inProgress' | 'completed',
      })
    );
  };
  return (
    <div>
      <div className="md:flex items-center justify-between w-full gap-2">
        <div className="flex gap-2">
          <Button
            onClick={() => setModalOpen(true)}
            variant="contained"
          >
            Add Task
          </Button>
          {/* <Button
            component={Link}
            to="/calendar"
            variant="contained"
          >
          View  Calendar
          </Button>
          <Button
            component={Link}
            to="/chart"
            variant="contained"
          >
            Visualize task
          </Button> */}
        </div>
        <div className="filters mt-3 md:mt-0">
          <input
            value={debouncedSearchTerm}
            onChange={(e) => setDebouncedSearchTerm(e.target.value)}
            className="search"
            placeholder="search todos"
          />
        </div>
        <ColorSelector />
      </div>
      <div className="todo-actions mt-16">
        {filteredIncompleteTodos.length === 0 &&
          filteredInProgressTodos.length === 0 &&
          filteredCompletedTodos.length === 0 ? (
            <Box className="text-center px-4 md:px-10 py-4 rounded-lg shadow-lg">
            <Typography variant="h3" className="font-extrabold dynamic-text mb-4">
              Welcome to TaskBuddy
            </Typography>
            <Box className="text-3xl mt-3 text-white space-y-3">
              <Box className="flex items-center  gap-2">
                <AddCircleOutlineIcon className="md:text-3xl" />
                <Typography>Add New Task</Typography>
              </Box>
              <Box className="flex items-center  gap-2">
                <CalendarTodayIcon className="md:text-3xl" />
                <Typography>View your task on a calendar</Typography>
              </Box>
              <Box className="flex items-center  gap-2">
                <BarChartIcon className="md:text-3xl" />
                <Typography>Get Real-time visualization of your tasks </Typography>
              </Box>
              <Box className="flex items-center  gap-2">
                <RocketLaunchIcon className="md:text-4xl" />
                <Typography>What are you waiting for?!</Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
              <Droppable droppableId="incomplete">
                {(provided) => (
                  <div
                    className="flex-1 flex flex-col  gap-3 w-full"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <h2 className=" text-sm md:text-xl font-bold  text-gradient">Incomplete Tasks</h2>
                    {filteredIncompleteTodos.map((todo, index) => (
                      <Draggable
                        key={todo.id}
                        draggableId={todo.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Todo {...todo} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="inProgress">
                {(provided) => (
                  <div
                    className="flex-1 flex flex-col  gap-3"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <h2 className=" text-sm md:text-xl font-bold text-gradient ">In Progress</h2>
                    {filteredInProgressTodos.map((todo, index) => (
                      <Draggable
                        key={todo.id}
                        draggableId={todo.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Todo {...todo} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="completed">
                {(provided) => (
                  <div
                    className="flex-1 flex flex-col gap-3"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <h2 className=" text-sm md:text-xl font-bold text-gradient">Completed Tasks</h2>
                    {filteredCompletedTodos.map((todo, index: number) => (
                      <Draggable
                        key={todo.id}
                        draggableId={todo.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Todo {...todo} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        )}
      </div>
      <TodoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddTodo}
      />
    </div>
  );
};

export default TodoList;
