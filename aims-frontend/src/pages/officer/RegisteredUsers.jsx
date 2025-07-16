import React, { useEffect, useState } from "react";
import axios from "axios";
import OfficerSidebar from "../../components/OfficerSidebar";
import { useNavigate } from "react-router-dom";

const RegisteredUsers = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to load users:", err));
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/user/delete/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u.userId !== userId));
      alert("User deleted successfully.");
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert("An error occurred while deleting.");
    }
  };

  return (
    <div className="d-flex">
      <OfficerSidebar />

      <div className="flex-grow-1 p-4">
        <h3 className="mb-4 fw-semibold">Registered Users</h3>

        <div className="table-responsive">
          <table className="table table-hover table-bordered shadow-sm rounded">
            <thead className="table-light">
              <tr className="text-center">
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Aadhaar</th>
                <th>PAN</th>
                <th>Address</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.userId} className="text-center align-middle">
                  <td>{idx + 1}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.aadhaarNumber}</td>
                  <td>{user.panNumber}</td>
                  <td>{user.address}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === "OFFICER" ? "bg-danger" : "bg-secondary"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger me-2"
                      onClick={() => handleDelete(user.userId)}
                    >
                      Delete
                    </button>
                    {/* <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => navigate(`/admin/user/${user.userId}`)}
                    >
                      View
                    </button> */}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-muted">
                    No users registered.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegisteredUsers;
