import React, { useState } from "react";
import { Home, Users, BookOpen, LogOut, Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/admin/dashboard" },
    { name: "Students", icon: <Users size={20} />, path: "/admin/student" },
    { name: "Teachers", icon: <BookOpen size={20} />, path: "/admin/teacher" },
  ];

  const handleLogout = () => {
    // Xóa token và thông tin người dùng nếu có
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    // Chuyển hướng về trang đăng nhập
    navigate("/");
  };

  return (
    <div
      className={`h-screen bg-gray-900 text-gray-100 flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        {!collapsed && <h1 className="text-lg font-bold">Admin Panel</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md bg-gray-900 text-gray-100"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-4">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                active ? "bg-indigo-600 text-white" : "bg-gray-900 text-gray-100"
              }`}
            >
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-700 p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-md bg-gray-900 text-gray-100 hover:bg-red-600 hover:text-white transition-colors"
        >
          <LogOut size={20} />
          {!collapsed && <span>Đăng xuất</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
