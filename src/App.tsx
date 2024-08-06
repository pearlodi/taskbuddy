// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import TodoCalendar from "./components/Calendar";

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Index />} />
//         <Route path="/calendar" element={<TodoCalendar />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from "./pages/Index";
import TodoCalendar from "./components/Calendar";
import TodoList from './components/TodoList';
import TaskStatusChart from './components/TaskStatusChart';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Index />}>
        <Route path="/" element={<TodoList />} />
          <Route path="/calendar" element={<TodoCalendar />} />
          <Route path="/chart" element={<TaskStatusChart />} />
          <Route path="/calendar" element={<TodoCalendar />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
