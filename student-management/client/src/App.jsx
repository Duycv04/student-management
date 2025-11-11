import React from "react";
import { Routes, Route } from "react-router-dom";
import Loginpage from "./pages/Loginpage";
import Register from "./pages/Register";
import Dashboard from "./pages/Admin/Dashboard";
import Students from "./pages/Admin/student";
import Teachers from "./pages/Admin/teacher";
import Classes from "./pages/Admin/Classes";
import ProfilePage from "./pages/Admin/ProfilePage";
import SettingsPage from "./pages/Admin/SettingsPage";
import ChangePasswordPage from "./pages/Admin/ChangePasswordPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Loginpage />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/student" element={<Students />} />
      <Route path="/admin/teacher" element={<Teachers />} />
      <Route path="/admin/classes" element={<Classes />} />
      <Route path="/admin/profile" element={<ProfilePage />} />
      <Route path="/admin/settings" element={<SettingsPage />} />
      <Route path="/admin/change-password" element={<ChangePasswordPage />} />
      
    </Routes>
  );
}

export default App;
