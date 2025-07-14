import React from "react";

const Step1Vehicle = ({ data, setData, nextStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (
      !data.registrationNumber ||
      !data.vehicleType ||
      !data.make ||
      !data.model ||
      !data.yearOfManufacture
    ) {
      alert("Please fill all vehicle details.");
      return;
    }
    nextStep();
  };

  return (
    <form onSubmit={handleNext}>
      <h5 className="mb-3">Step 1: Enter Vehicle Details</h5>

      <div className="mb-3">
        <label className="form-label">Registration Number</label>
        <input
          type="text"
          name="registrationNumber"
          className="form-control"
          value={data.registrationNumber}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Vehicle Type</label>
        <select
          name="vehicleType"
          className="form-select"
          value={data.vehicleType}
          onChange={handleChange}
        >
          <option value="">Select type</option>
          <option value="CAR">Car</option>
          <option value="BIKE">Bike</option>
          <option value="TRUCK">Truck</option>
        </select>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Make</label>
          <input
            type="text"
            name="make"
            className="form-control"
            value={data.make}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Model</label>
          <input
            type="text"
            name="model"
            className="form-control"
            value={data.model}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Year of Manufacture</label>
        <input
          type="number"
          name="yearOfManufacture"
          className="form-control"
          value={data.yearOfManufacture}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Next
      </button>
    </form>
  );
};

export default Step1Vehicle;
