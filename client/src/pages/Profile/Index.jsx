import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // ต้องมั่นใจว่า AuthContext มีข้อมูลผู้ใช้
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { user } = useContext(AuthContext); // ดึงข้อมูลผู้ใช้จาก AuthContext
  const navigate = useNavigate(); // Hook สำหรับการนำทาง

  const handleEditProfile = () => {
    navigate("/UpdateProfile"); // ใช้เส้นทางที่ตรงกับ router
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="card bg-white shadow-xl rounded-xl w-96 p-6 flex flex-col items-center">
        <figure className="w-24 h-24">
          <img
            className="w-full h-full object-cover rounded-full border-4 border-purple-500"
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
          />
        </figure>
        <div className="card-body text-center space-y-2 mt-4">
          <h2 className="text-xl font-bold text-gray-800">
            {user?.displayName || "ชื่อผู้ใช้"}
          </h2>
          <p className="text-gray-600 text-sm">
            {user?.email || "อีเมลไม่ระบุ"}
          </p>
          <button
            className="btn btn-primary w-full mt-3"
            onClick={handleEditProfile}
          >
            แก้ไขโปรไฟล์
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
