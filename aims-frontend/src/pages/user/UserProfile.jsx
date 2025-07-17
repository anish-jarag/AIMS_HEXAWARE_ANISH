import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../../components/UserNavbar";

const UserProfile = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    address: "",
    dateOfBirth: "",
    aadhaarNumber: "",
    panNumber: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to load profile:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:8080/api/user/update",
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <>
      <UserNavbar />
      <div className="container mt-5">
        <h2 className="mb-4">My Profile</h2>

        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="form-control"
              value={user.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={user.email}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={user.address}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              value={user.dateOfBirth}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Aadhaar Number</label>
            <input
              type="text"
              className="form-control"
              value={user.aadhaarNumber}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label">PAN Number</label>
            <input
              type="text"
              className="form-control"
              value={user.panNumber}
              readOnly
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
};

export default UserProfile;
