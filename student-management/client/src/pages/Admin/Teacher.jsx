import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";

const Teachers = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-6">
          <h1 className="text-2xl font-bold text-gray-700">Quản lý giáo viên</h1>
          <p className="text-gray-600">Đây là trang hiển thị danh sách giáo viên.</p>
        </main>
      </div>
    </div>
  );
};

export default Teachers;
