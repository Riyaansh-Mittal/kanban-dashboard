import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import KanbanBoard from "./pages/KanbanBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<KanbanBoard />} />
        {/* <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
