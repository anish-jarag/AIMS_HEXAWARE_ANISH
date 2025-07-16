import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data;
      localStorage.setItem("jwtToken", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);

      if (data.role === "OFFICER") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data || "An error occurred. Please try again.";
      alert(errorMsg);
      console.error("Login failed:", err);
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
          style={{ maxWidth: "900px" }}
        >
          {/* Image Section */}
          <div
            className="col-md-6 d-none d-md-block"
            style={{
              backgroundImage: "url('/images/login_slide.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "450px",
            }}
          ></div>

          {/* Form Section */}
          <div className="col-md-6 bg-white p-5">
            <h3 className="text-center mb-4 text-primary">
              Login to HexaShield
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  className="form-control"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  className="form-control"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-grid">
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
              </div>
              <div className="text-end mt-2">
                <a href="#" className="text-decoration-none text-muted">
                  Forgot Password?
                </a>
              </div>
              <div className="text-center mt-3">
                <span className="text-muted">New user? </span>
                <Link to="/register" className="text-primary fw-semibold">
                  Register Now
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
