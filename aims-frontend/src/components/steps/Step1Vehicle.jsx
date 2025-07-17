import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    axiosInstance
      .get("/vehicle/my")
      .then((res) => setVehicles(res.data))
      .catch((err) => {
        console.error("Failed to load vehicles", err);
        toast.error("Failed to load your vehicles.");
      });
  }, []);

  const handleNext = async () => {
    if (useExisting) {
      const selected = vehicles.find(
        (v) => v.vehicleId === Number(selectedVehicleId)
      );
      if (!selected) return toast.warn("Please select a vehicle.");

      setFormData({
        ...formData,
        vehicleId: selected.vehicleId,
        vehicleType: selected.vehicleType,
      });
      return nextStep();
    }

    const { registrationNumber, vehicleType, make, model, yearOfManufacture } =
      newVehicle;

    if (
      !registrationNumber ||
      !vehicleType ||
      !make ||
      !model ||
      !yearOfManufacture
    ) {
      return toast.warn("Please fill all new vehicle details.");
    }

    try {
      const res = await axiosInstance.post("/vehicle/add", newVehicle);
      toast.success("Vehicle added successfully!");

      const updated = await axiosInstance.get("/vehicle/my");
      const latest = updated.data.at(-1); // last added

      setFormData({
        ...formData,
        vehicleId: latest.vehicleId,
        vehicleType: latest.vehicleType,
      });

      nextStep();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data || "Vehicle submission failed.");
    }
  };

  return (
    <div>
      <h5 className="fw-bold mb-3">Step 1: Vehicle Details</h5>

      <div className="form-check form-switch mb-4">
        <input
          className="form-check-input"
          type="checkbox"
          id="useExisting"
          checked={useExisting}
          onChange={() => setUseExisting(!useExisting)}
        />
        <label className="form-check-label" htmlFor="useExisting">
          {useExisting ? "Use existing vehicle" : "Add a new vehicle"}
        </label>
      </div>

      {useExisting ? (
        <div>
          {vehicles.length === 0 ? (
            <p className="text-muted">No vehicles found. Add one below.</p>
          ) : (
            <div className="list-group">
              {vehicles.map((v) => (
                <label key={v.vehicleId} className="list-group-item">
                  <input
                    type="radio"
                    className="form-check-input me-2"
                    name="vehicleSelect"
                    value={v.vehicleId}
                    checked={Number(selectedVehicleId) === v.vehicleId}
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
        <div className="card p-3 shadow-sm mb-4 border border-light-subtle">
          <div className="row g-3">
            <div className="col-md-6">
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
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Vehicle Type</label>
              <select
                className="form-select"
                value={newVehicle.vehicleType}
                onChange={(e) =>
                  setNewVehicle({ ...newVehicle, vehicleType: e.target.value })
                }
              >
                <option value="">Select Type</option>
                <option value="CAR">Car</option>
                <option value="BIKE">Bike</option>
                <option value="TRUCK">Truck</option>
                <option value="CAMPER_VAN">Camper Van</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Make</label>
              <input
                className="form-control"
                value={newVehicle.make}
                onChange={(e) =>
                  setNewVehicle({ ...newVehicle, make: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Model</label>
              <input
                className="form-control"
                value={newVehicle.model}
                onChange={(e) =>
                  setNewVehicle({ ...newVehicle, model: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Year</label>
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
              />
            </div>
          </div>
        </div>
      )}

      <div className="text-end mt-3">
        <button className="btn btn-primary" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1Vehicle;
