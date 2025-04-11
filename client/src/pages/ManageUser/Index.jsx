import { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import Swal from "sweetalert2";
import { FaUsers } from "react-icons/fa";

const Index = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await UserService.getAllUser();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleToggleRole = async (email, currentRole) => {
    try {
      if (currentRole === "user") {
        await UserService.makeAdmin(email);
      } else {
        await UserService.makeUser(email);
      }

      // อัปเดต UI โดยเปลี่ยน role ใน state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email
            ? { ...user, role: currentRole === "user" ? "admin" : "user" }
            : user
        )
      );

      Swal.fire({
        icon: "success",
        title: `Role updated successfully!`,
        text: `${email} is now a ${currentRole === "user" ? "Admin" : "User"}.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error updating role:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update role",
        text: error.response?.data?.message || "Something went wrong.",
      });
    }
  };
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">No</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-3">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id} className="text-center">
                  <td>{index + 1}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border flex items-center justify-center">
                    <label className="flex items-center cursor-pointer">
                      <span className="flex items-center mr-2">
                        <FaUsers className="mr-3" />
                        {user.role === "admin" ? "Admin" : "User"}
                      </span>
                      <input
                        type="checkbox"
                        className="toggle"
                        checked={user.role === "admin"}
                        onChange={() => handleToggleRole(user.email, user.role)}
                      />
                    </label>
                  </td>
                  <td className="p-3 border">
                    <button
                      className="bg-red text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;   