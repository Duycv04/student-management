import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, LogOut, User, Settings, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";


const AdminHeader = ({ user }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option) => {
    setOpen(false);
    switch (option) {
      case "profile":
        navigate("/admin/profile");
        break;
      case "settings":
        navigate("/admin/settings");
        break;
      case "password":
        navigate("/admin/change-password");
        break;
      case "logout":
        navigate("/");
        break;
      default:
        break;
    }
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      {/* Logo / tiêu đề trang */}
      <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>

      {/* Khu vực người dùng */}
      <div className="flex items-center space-x-3" ref={menuRef}>
        <p className="hidden sm:block text-gray-600">
          Xin chào,{" "}
          <span className="font-medium text-gray-800">{user?.name || "Admin"}</span>
        </p>

        {/* Avatar + dropdown */}
        <button
          onClick={() => setOpen(!open)}
          className="relative flex items-center focus:outline-none"
        >
          <img
            src={user?.avatar || "/default-avatar.png"}
            alt="avatar"
            className="w-10 h-10 rounded-full border border-gray-300 object-cover"
          />
          <ChevronDown
            className={`ml-1 w-4 h-4 text-gray-600 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Menu nhỏ */}
        {open && (
          <div className="absolute top-14 right-4 bg-white shadow-lg border border-gray-200 rounded-lg w-56 z-50 animate-fadeIn">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="font-medium text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <ul className="text-sm text-gray-700">
              <li
                onClick={() => handleOptionClick("profile")}
                className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
              >
                <User size={16} /> Hồ sơ cá nhân
              </li>
              <li
                onClick={() => handleOptionClick("settings")}
                className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
              >
                <Settings size={16} /> Cài đặt
              </li>
              <li
                onClick={() => handleOptionClick("password")}
                className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
              >
                <KeyRound size={16} /> Đổi mật khẩu
              </li>
              <li
                onClick={() => handleOptionClick("logout")}
                className="px-4 py-2 flex items-center gap-2 text-red-600 hover:bg-gray-100 cursor-pointer"
              >
                <LogOut size={16} /> Đăng xuất
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
