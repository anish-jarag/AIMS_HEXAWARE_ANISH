import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error("Failed to load profile:", err);
        toast.error("Failed to load profile.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/user/update`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading profile...</p>;

  return (
    <>
      <UserNavbar />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h3 className="card-title text-center mb-4">👤 My Profile</h3>
                <hr />

                <form onSubmit={handleUpdate}>
                  <div className="row g-3">
                    <div className="col-md-6">
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

                    <div className="col-md-6">
                      <label className="form-label">Email (Read Only)</label>
                      <input
                        type="email"
                        className="form-control"
                        value={user.email}
                        readOnly
                      />
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        name="address"
                        className="form-control"
                        value={user.address}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Date of Birth</label>
                      <input
                        type="date"
                        className="form-control"
                        value={user.dateOfBirth}
                        readOnly
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Aadhaar Number</label>
                      <input
                        type="text"
                        className="form-control"
                        value={user.aadhaarNumber}
                        readOnly
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">PAN Number</label>
                      <input
                        type="text"
                        className="form-control"
                        value={user.panNumber}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="mt-4 text-end">
                    <button type="submit" className="btn btn-primary px-4">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
