import React, { useEffect, useState } from "react";
import axios from "axios";

const Step1Vehicle = ({ formData, setFormData, nextStep }) => {
  const [vehicles, setVehicles] = useState([]);
  const [useExisting, setUseExisting] = useState(true);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [newVehicle, setNewVehicle] = useState({
    registrationNumber: "",
    vehicleType: "",
    make: "",
    model: "",
    yearOfManufacture: "",
  });

  const token = localStorage.getItem("jwtToken");

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: { Authorization: `Bearer ${token}` },
  });

  // Load user vehicles
  useEffect(() => {
    axiosInstance
      .get("/vehicle/my")
      .then((res) => setVehicles(res.data))
      .catch((err) => console.error("Failed to load vehicles", err));
  }, []);

  const handleNext = async () => {
    if (useExisting) {
      const selected = vehicles.find(
        (v) => v.vehicleId === parseInt(selectedVehicleId)
      );
      if (!selected) return alert("Please select a vehicle");

      // Store both vehicleId and vehicleType
      setFormData({
        ...formData,
        vehicleId: selected.vehicleId,
        vehicleType: selected.vehicleType,
      });

      nextStep();
    } else {
      const {
        registrationNumber,
        vehicleType,
        make,
        model,
        yearOfManufacture,
      } = newVehicle;

      if (
        !registrationNumber ||
        !vehicleType ||
        !make ||
        !model ||
        !yearOfManufacture
      ) {
        return alert("Please fill all vehicle details");
      }

      try {
        const res = await axiosInstance.post("/vehicle/add", newVehicle);
        alert(res.data || "Vehicle added successfully.");

        const updated = await axiosInstance.get("/vehicle/my");
        const latest = updated.data[updated.data.length - 1];

        setFormData({
          ...formData,
          vehicleId: latest.vehicleId,
          vehicleType: latest.vehicleType,
        });

        nextStep();
      } catch (err) {
        console.error(err);
        alert(err.response?.data || "Vehicle submission failed.");
      }
    }
  };

  return (
    <div>
      <h5>Step 1: Vehicle Details</h5>

      <div className="form-check form-switch my-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="useExisting"
          checked={useExisting}
          onChange={() => setUseExisting(!useExisting)}
        />
        <label className="form-check-label" htmlFor="useExisting">
          {useExisting ? "Using existing vehicle" : "Adding new vehicle"}
        </label>
      </div>

      {useExisting ? (
        <div className="mb-4">
          {vehicles.length === 0 ? (
            <p className="text-muted">
              No vehicles found. Please add a new one.
            </p>
          ) : (
            <div className="list-group">
              {vehicles.map((v) => (
                <label key={v.vehicleId} className="list-group-item">
                  <input
                    type="radio"
                    name="vehicleSelect"
                    className="form-check-input me-2"
                    value={v.vehicleId}
                    checked={parseInt(selectedVehicleId) === v.vehicleId}
                    onChange={(e) => setSelectedVehicleId(e.target.value)}
                  />
                  <strong>{v.registrationNumber}</strong> – {v.make} {v.model} (
                  {v.vehicleType}, {v.yearOfManufacture})
                </label>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="card p-3 shadow-sm mb-4">
          <div className="mb-2">
            <label className="form-label">Registration Number</label>
            <input
              className="form-control"
              value={newVehicle.registrationNumber}
              onChange={(e) =>
                setNewVehicle({
                  ...newVehicle,
                  registrationNumber: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Vehicle Type</label>
            <select
              className="form-select"
              value={newVehicle.vehicleType}
              onChange={(e) =>
                setNewVehicle({ ...newVehicle, vehicleType: e.target.value })
              }
              required
            >
              <option value="">Select Type</option>
              <option value="CAR">Car</option>
              <option value="BIKE">Bike</option>
              <option value="TRUCK">Truck</option>
              <option value="CAMPER_VAN">Camper Van</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="form-label">Make</label>
            <input
              className="form-control"
              value={newVehicle.make}
              onChange={(e) =>
                setNewVehicle({ ...newVehicle, make: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Model</label>
            <input
              className="form-control"
              value={newVehicle.model}
              onChange={(e) =>
                setNewVehicle({ ...newVehicle, model: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Year of Manufacture</label>
            <input
              type="number"
              className="form-control"
              value={newVehicle.yearOfManufacture}
              onChange={(e) =>
                setNewVehicle({
                  ...newVehicle,
                  yearOfManufacture: e.target.value,
                })
              }
              required
            />
          </div>
        </div>
      )}

      <div className="d-flex justify-content-end">
        <button className="btn btn-primary" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1Vehicle;
