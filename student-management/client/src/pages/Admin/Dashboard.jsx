import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col bg-gray-100">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Tổng quan hệ thống</h1>
          <p className="text-gray-600">Chào mừng đến với trang quản trị.</p>

          {/* Nội dung demo */}
          <div className="mt-8 grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-gray-700 mb-2">Tổng số sinh viên</h3>
              <p className="text-3xl font-bold text-indigo-600">350</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-gray-700 mb-2">Tổng số giảng viên</h3>
              <p className="text-3xl font-bold text-indigo-600">42</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-gray-700 mb-2">Số lớp học</h3>
              <p className="text-3xl font-bold text-indigo-600">18</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
