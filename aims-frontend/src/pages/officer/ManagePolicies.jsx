import React, { useEffect, useState } from "react";
import OfficerSidebar from "../../components/OfficerSidebar";

const initialFormState = {
  policyName: "",
  description: "",
  basePremium: "",
  vehicleType: "",
  active: true,
};

const ManagePolicies = () => {
  const [policies, setPolicies] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  // const [vehicleTypes, setVehicleTypes] = useState([]);

  // Fetch policies
  const loadPolicies = async () => {
    const res = await fetch("http://localhost:8080/api/policy/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch policies");
      setPolicies([]);
      return;
    }

    const data = await res.json();
    setPolicies(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadPolicies();
    // fetchVehicleTypes();
  }, []);

  // Add or update policy
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `http://localhost:8080/api/policy/update/${editId}`
      : "http://localhost:8080/api/policy/add";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      await loadPolicies();
      setFormData(initialFormState);
      setIsEditing(false);
      setEditId(null);
    } else {
      const msg = await res.text();
      alert(msg || "Operation failed.");
    }
  };

  // Edit a policy
  const handleEdit = (policy) => {
    setFormData({
      policyName: policy.policyName,
      description: policy.description,
      basePremium: policy.basePremium,
      vehicleType: policy.vehicleType,
      active: policy.active,
    });
    setEditId(policy.policyId);
    setIsEditing(true);
  };

  // Delete a policy
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this policy?")) return;

    const res = await fetch(`http://localhost:8080/api/policy/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    if (res.ok) {
      await loadPolicies();
    } else {
      const msg = await res.text();
      alert(msg || "Failed to delete.");
    }
  };

  return (
    <div className="d-flex">
      <OfficerSidebar />

      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Manage Policies</h2>
        </div>

        {/* Form */}
        <form className="card p-4 mb-4 shadow-sm" onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                className="form-control"
                name="policyName"
                placeholder="Policy Name"
                value={formData.policyName}
                onChange={(e) =>
                  setFormData({ ...formData, policyName: e.target.value })
                }
                required
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                name="basePremium"
                placeholder="Base Premium"
                type="number"
                value={formData.basePremium}
                onChange={(e) =>
                  setFormData({ ...formData, basePremium: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <select
                className="form-select"
                value={formData.vehicleType}
                onChange={(e) =>
                  setFormData({ ...formData, vehicleType: e.target.value })
                }
              >
                <option value={-1}>Choose Vehicle</option>
                <option value="CAR">Car</option>
                <option value="BIKE">Bike</option>
                <option value="TRUCK">Truck</option>
                <option value="CAMPER_VAN">Camper Van</option>
              </select>
            </div>
            <div className="col-md-6">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) =>
                    setFormData({ ...formData, active: e.target.checked })
                  }
                />
                <label className="form-check-label">Active</label>
              </div>
            </div>
          </div>

          <button className="btn btn-primary" type="submit">
            {isEditing ? "Update Policy" : "Add Policy"}
          </button>
        </form>

        {/* Policies List */}
        <div className="row">
          {policies.map((p) => (
            <div className="col-md-4 mb-3" key={p.policyId}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5>{p.policyName}</h5>
                  <p>{p.description}</p>
                  <p>
                    <strong>Premium:</strong> ₹{p.basePremium}
                  </p>
                  <p>
                    <strong>Type:</strong> {p.vehicleType}
                  </p>
                  <span
                    className={`badge ${
                      p.active ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {p.active ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(p.policyId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagePolicies;
