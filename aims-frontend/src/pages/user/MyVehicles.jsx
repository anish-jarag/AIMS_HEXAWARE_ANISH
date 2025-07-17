import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../../components/UserNavbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialFormState = {
  registrationNumber: "",
  vehicleType: "",
  make: "",
  model: "",
  yearOfManufacture: "",
};

const MyVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("jwtToken");
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const loadVehicles = async () => {
    try {
      const res = await axiosAuth.get("/vehicle/my");
      setVehicles(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error loading vehicles:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadVehicleTypes = async () => {
    try {
      const res = await axiosAuth.get("/vehicle/vehicle-types");
      setVehicleTypes(res.data || []);
    } catch (err) {
      console.error("Error loading vehicle types:", err);
    }
  };

  useEffect(() => {
    loadVehicles();
    loadVehicleTypes();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosAuth.post("/vehicle/add", formData);
      toast.success("Vehicle added successfully!");
      setFormData(initialFormState);
      loadVehicles();
    } catch (err) {
      toast.error(err.response?.data || "Failed to add vehicle.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?"))
      return;
    try {
      await axiosAuth.delete(`/vehicle/delete/${id}`);
      toast.success("Vehicle deleted.");
      loadVehicles();
    } catch (err) {
      toast.error(
        err.response?.data ||
          "Cannot delete vehicle. It may be linked to a policy or proposal."
      );
    }
  };

  return (
    <>
      <UserNavbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container py-5">
        <h2 className="fw-bold mb-4">Manage My Vehicles</h2>

        {/* Add Vehicle Form */}
        <form className="card p-4 shadow-sm mb-5" onSubmit={handleSubmit}>
          <h5 className="mb-3">Add New Vehicle</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                className="form-control"
                name="registrationNumber"
                placeholder="Registration Number"
                value={formData.registrationNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                required
              >
                <option value="">Select Vehicle Type</option>
                {vehicleTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                name="make"
                placeholder="Make"
                value={formData.make}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                name="model"
                placeholder="Model"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                name="yearOfManufacture"
                type="number"
                placeholder="Year of Manufacture"
                value={formData.yearOfManufacture}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 text-end">
              <button className="btn btn-primary" type="submit">
                Add Vehicle
              </button>
            </div>
          </div>
        </form>

        {/* Vehicle Cards */}
        <h5 className="mb-3">My Registered Vehicles</h5>
        {loading ? (
          <p>Loading vehicles...</p>
        ) : vehicles.length === 0 ? (
          <p className="text-muted">No vehicles found. Add one above.</p>
        ) : (
          <div className="row g-4">
            {vehicles.map((v) => (
              <div className="col-md-6 col-lg-4" key={v.vehicleId}>
                <div className="card h-100 border-2 shadow-md vehicle-card">
                  <div className="card-body">
                    <h5 className="fw-bold text-primary">
                      {v.registrationNumber}
                    </h5>
                    <hr />
                    <p>
                      <strong>Type:</strong> {v.vehicleType}
                    </p>
                    <p>
                      <strong>Make:</strong> {v.make}
                    </p>
                    <p>
                      <strong>Model:</strong> {v.model}
                    </p>
                    <p>
                      <strong>Year:</strong> {v.yearOfManufacture}
                    </p>
                  </div>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(v.vehicleId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyVehicles;
