import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  description: string;
  status: 'incomplete' | 'inProgress' | 'completed';
}

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: any;
}

interface TodosState {
  todos: Todo[];
  events: Event[];
}

const initialState: TodosState = {
  todos: JSON.parse(localStorage.getItem('todos') || '[]'),
  events: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{
        id: number;
        text: string;
        dueDate?: string;
        description: string;
        priority: 'low' | 'medium' | 'high';
        status: 'incomplete';
      }>
    ) => {
      const newTodo: Todo = {
        id: action.payload.id,
        text: action.payload.text,
        completed: false,
        dueDate: action.payload.dueDate,
        priority: action.payload.priority,
        description: action.payload.description,
        status: action.payload.status,
      };
      state.todos.push(newTodo);

      if (newTodo.dueDate) {
        state.events.push({
          id: newTodo.id,
          title: newTodo.text,
          start: new Date(newTodo.dueDate),
          end: new Date(newTodo.dueDate),
          allDay: true,
        });
      }

      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    editTodo: (
      state,
      action: PayloadAction<{
        id: number;
        text: string;
        dueDate?: string;
        description: string;
        priority: 'low' | 'medium' | 'high';
        status: 'incomplete' | 'inProgress' | 'completed';
      }>
    ) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = {
          ...state.todos[index],
          ...action.payload,
        };

        const eventIndex = state.events.findIndex(event => event.id === action.payload.id);
        if (eventIndex !== -1) {
          state.events[eventIndex] = {
            id: action.payload.id,
            title: action.payload.text,
            start: new Date(action.payload.dueDate || state.todos[index].dueDate!),
            end: new Date(action.payload.dueDate || state.todos[index].dueDate!),
            allDay: true,
          };
        }
      }

      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      state.events = state.events.filter(event => event.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    updateTodoStatus: (
      state,
      action: PayloadAction<{ id: number; status: 'incomplete' | 'inProgress' | 'completed' }>
    ) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index].status = action.payload.status;
        localStorage.setItem('todos', JSON.stringify(state.todos));
      }
    },
    reorderTodos: (
      state,
      action: PayloadAction<{
        sourceIndex: number;
        destinationIndex: number;
        sourceList: 'incomplete' | 'inProgress' | 'completed';
        targetList: 'incomplete' | 'inProgress' | 'completed';
      }>
    ) => {
      const { sourceIndex, destinationIndex, sourceList, targetList } = action.payload;

      const sourceTodos = state.todos.filter(todo => todo.status === sourceList);
      const targetTodos = state.todos.filter(todo => todo.status === targetList);

      const [movedTodo] = sourceTodos.splice(sourceIndex, 1);
      targetTodos.splice(destinationIndex, 0, movedTodo);

      state.todos = [
        ...state.todos.filter(todo => todo.status !== sourceList && todo.status !== targetList),
        ...sourceTodos.map(todo => ({ ...todo, status: sourceList })),
        ...targetTodos.map(todo => ({ ...todo, status: targetList })),
      ];

      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
  },
});

export const { addTodo, editTodo, deleteTodo, updateTodoStatus, reorderTodos } = todosSlice.actions;
export default todosSlice.reducer;
