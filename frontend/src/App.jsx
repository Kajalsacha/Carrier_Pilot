import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import Dashboard from "./pages/Dashboard/Dashboard";
import Applications from "./pages/Applications/Applications";
import Analytics from "./pages/Analytics/Analytics";
import Roadmaps from "./pages/Roadmaps/Roadmaps";
import MentorChat from "./pages/Chat/MentorChat";
import Profile from "./pages/Profile/Profile";

import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/applications" element={<Applications />} />

          <Route path="/analytics" element={<Analytics />} />

          <Route path="/roadmaps" element={<Roadmaps />} />

          <Route path="/chat" element={<MentorChat />} />

          <Route path="/profile" element={<Profile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;