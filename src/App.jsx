import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Cities from "./pages/Cities";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Countries from "./pages/Countries";
import Favorites from "./pages/Favorites";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/countries" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cities" element={<Cities />} />

        <Route path="/countries" element={<Countries />} />
        <Route
          path="/favorites"
          element={
              <ProtectedRoute>
                  <Favorites />
              </ProtectedRoute>
          }
        />
        <Route path="*" element={<h2>Page not found</h2>} />
      </Routes>
    </>
  );
}

export default App;
