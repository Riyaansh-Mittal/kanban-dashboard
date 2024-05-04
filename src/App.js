import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import KanbanBoard from "./pages/KanbanBoard";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={isAuthenticated ? <Navigate to="/board" /> : <LoginPage />}
        />
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/board" element={<KanbanBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
