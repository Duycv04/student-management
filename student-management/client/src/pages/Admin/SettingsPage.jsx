import React, { useState } from "react";

const SettingsPage = () => {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("vi");
  
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Cài đặt hệ thống</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Giao diện
          </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
          >
            <option value="light">Sáng</option>
            
            <option value="dark">Tối</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Ngôn ngữ
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
          >
            <option value="vi">Tiếng Việt</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      <button className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Lưu thay đổi
      </button>
    </div>
  );
};

export default SettingsPage;
