import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../../components/UserNavbar";

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

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const loadVehicles = async () => {
    try {
      const res = await axiosInstance.get("/vehicle/my");
      setVehicles(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch vehicles:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadVehicleTypes = async () => {
    try {
      const res = await axiosInstance.get("/vehicle/vehicle-types");
      setVehicleTypes(res.data);
    } catch (err) {
      console.error("Failed to load vehicle types:", err.message);
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
      await axiosInstance.post("/vehicle/add", formData);
      alert("Vehicle added successfully!");
      setFormData(initialFormState);
      loadVehicles();
    } catch (err) {
      const msg = err.response?.data || "Failed to add vehicle.";
      alert(msg);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?"))
      return;
    try {
      await axiosInstance.delete(`/vehicle/delete/${id}`);
      loadVehicles();
    } catch (err) {
      alert("Failed to delete vehicle.");
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="container py-5">
        <h2 className="fw-bold mb-4">Manage My Vehicles</h2>

        {/* Form Section */}
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
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body">
                    <h5 className="fw-bold">{v.registrationNumber}</h5>
                    <hr />
                    <p className="mb-1">
                      <strong>Type:</strong> {v.vehicleType}
                    </p>
                    <p className="mb-1">
                      <strong>Make:</strong> {v.make}
                    </p>
                    <p className="mb-1">
                      <strong>Model:</strong> {v.model}
                    </p>
                    <p className="mb-0">
                      <strong>Year:</strong> {v.yearOfManufacture}
                    </p>
                  </div>
                  <div className="card-footer bg-white border-0 text-end">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(v.vehicleId)}
                    >
                      Delete
                    </button>
                  </div>
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
