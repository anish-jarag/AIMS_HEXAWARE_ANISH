import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/register",
        formData
      );

      alert(res.data || "Registered successfully");
      navigate("/login");
    } catch (err) {
      const message =
        err.response?.data || "Registration failed. Please try again.";
      alert(message);
      console.error("Register error:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <div
        className="container d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="row shadow-lg rounded overflow-hidden w-100"
          style={{ maxWidth: "800px" }}
        >
          <div className="col-md-12 bg-white p-5">
            <h3 className="text-center mb-4 text-primary">
              Register for HexaShield
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    className="form-control"
                    name="fullName"
                    placeholder="Full Name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    className="form-control"
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    className="form-control"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    className="form-control"
                    name="dateOfBirth"
                    type="date"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    className="form-control"
                    name="aadhaarNumber"
                    placeholder="Aadhaar Number"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    className="form-control"
                    name="panNumber"
                    placeholder="PAN Number"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <input
                    className="form-control"
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="d-grid">
                <button className="btn btn-primary" type="submit">
                  Register
                </button>
              </div>
              <div className="text-center mt-3">
                <span className="text-muted">Already have an account? </span>
                <Link to="/login" className="text-primary fw-semibold">
                  Login Here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
