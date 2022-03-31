import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import TasksPage from "./Pages/TasksPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="tasks" element={<TasksPage />} />
    </Routes>
  );
}

export default App;
