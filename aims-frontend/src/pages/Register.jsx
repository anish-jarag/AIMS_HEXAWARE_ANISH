import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    address: "",
    dateOfBirth: "",
    aadhaarNumber: "",
    panNumber: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const message = await res.text();
    alert(message);

    if (res.ok) {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow p-4">
              <h3 className="text-center mb-4">Register</h3>
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control mb-3"
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
                <input
                  className="form-control mb-3"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
                <input
                  className="form-control mb-3"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
                <input
                  className="form-control mb-3"
                  name="address"
                  placeholder="Address"
                  onChange={handleChange}
                  required
                />
                <input
                  className="form-control mb-3"
                  name="dateOfBirth"
                  type="date"
                  onChange={handleChange}
                  required
                />
                <input
                  className="form-control mb-3"
                  name="aadhaarNumber"
                  placeholder="Aadhaar Number"
                  onChange={handleChange}
                  required
                />
                <input
                  className="form-control mb-3"
                  name="panNumber"
                  placeholder="PAN Number"
                  onChange={handleChange}
                  required
                />
                <button className="btn btn-primary w-100" type="submit">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
