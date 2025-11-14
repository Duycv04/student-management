import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    id: "",
    student_code: "",
    name: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    class_id: "",
    img: "",
  });

  const [loading, setLoading] = useState(true);

  // 👤 Lấy id sinh viên từ localStorage (giả sử đã lưu khi đăng nhập)
  const id = localStorage.getItem("id");

  // Khi component load -> gọi API lấy dữ liệu
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/profile/${id}`
        );
        setProfile(res.data);
      } catch (err) {
        console.error("Lỗi khi tải thông tin:", err);
        toast.error("Không thể tải thông tin sinh viên!");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  // ✅ Xử lý thay đổi input
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // ✅ Gửi cập nhật thông tin
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/profile/${id}`, profile);
      toast.success("Cập nhật thông tin thành công!");
    } catch (err) {
      console.error(" Lỗi cập nhật:", err);
      toast.error("Lỗi khi cập nhật, vui lòng thử lại!");
    }
  };

  if (loading)
    return <p className="text-center text-gray-600 mt-10">Đang tải dữ liệu...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Hồ sơ sinh viên
        </h2>

        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Ảnh đại diện */}
          <div className="flex flex-col items-center md:w-1/3 mb-6 md:mb-0">
            <img
              src={profile.img || "https://via.placeholder.com/150"}
              alt="Avatar"
              className="w-40 h-40 rounded-full object-cover border shadow-sm"
            />
            <h3 className="mt-4 text-lg font-semibold">{profile.name}</h3>
            <p className="text-gray-500">{profile.student_code}</p>
          </div>

          {/* Form thông tin */}
          <form
            onSubmit={handleSubmit}
            className="md:w-2/3 space-y-3"
            autoComplete="off"
          >
            <div>
              <label className="font-medium">Họ tên</label>
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="font-medium">Ngày sinh</label>
              <input
                type="date"
                name="dob"
                value={profile.dob?.slice(0, 10) || ""}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="font-medium">Giới tính</label>
              <select
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              >
                <option value="">-- Chọn giới tính --</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>

            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="font-medium">Số điện thoại</label>
              <input
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="font-medium">Mã lớp</label>
              <input
                name="class_id"
                value={profile.class_id}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>
            {/* up load img từ file */}
            <div>
              <label className="font-medium">Ảnh đại diện</label>
              <input
                type="file"
                name="img"
                onChange={(e) =>
                  setProfile({ ...profile, img: e.target.files[0] })
                }
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Lưu thay đổi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default ProfilePage;
