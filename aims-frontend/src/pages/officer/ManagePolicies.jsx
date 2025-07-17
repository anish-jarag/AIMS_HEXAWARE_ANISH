import React, { useEffect, useState } from "react";
import OfficerSidebar from "../../components/OfficerSidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("jwtToken");

  const loadPolicies = async () => {
    try {
      const res = await fetch(`${BASE_URL}/policy/all`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch policies");

      const data = await res.json();
      setPolicies(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("Could not load policies.");
      setPolicies([]);
    }
  };

  useEffect(() => {
    loadPolicies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `${BASE_URL}/policy/update/${editId}`
      : `${BASE_URL}/policy/add`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(await res.text());

      toast.success(isEditing ? "Policy updated." : "Policy added.");
      setFormData(initialFormState);
      setIsEditing(false);
      setEditId(null);
      await loadPolicies();
    } catch (err) {
      toast.error(err.message || "Failed to save policy.");
    }
  };

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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this policy?")) return;

    try {
      const res = await fetch(`${BASE_URL}/policy/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(await res.text());

      toast.success("Policy deleted.");
      await loadPolicies();
    } catch (err) {
      toast.error(err.message || "Failed to delete policy.");
    }
  };

  return (
    <div className="d-flex min-vh-100">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Sidebar */}
      <div style={{ width: "250px", minWidth: "250px" }}>
        <OfficerSidebar />
      </div>

      {/* Content */}
      <div className="flex-grow-1 p-4 bg-light">
        <h2 className="mb-4">Manage Policies</h2>

        {/* Form */}
        <form className="card p-4 mb-4 shadow" onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <input
                className="form-control"
                placeholder="Policy Name"
                value={formData.policyName}
                onChange={(e) =>
                  setFormData({ ...formData, policyName: e.target.value })
                }
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                className="form-control"
                type="number"
                placeholder="Base Premium"
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
              placeholder="Description"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <select
                className="form-select"
                value={formData.vehicleType}
                onChange={(e) =>
                  setFormData({ ...formData, vehicleType: e.target.value })
                }
                required
              >
                <option value="">Choose Vehicle Type</option>
                <option value="CAR">Car</option>
                <option value="BIKE">Bike</option>
                <option value="TRUCK">Truck</option>
                <option value="CAMPER_VAN">Camper Van</option>
              </select>
            </div>
            <div className="col-md-6 d-flex align-items-center mb-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) =>
                    setFormData({ ...formData, active: e.target.checked })
                  }
                />
                <label className="form-check-label ms-2">Active</label>
              </div>
            </div>
          </div>

          <button className="btn btn-primary" type="submit">
            {isEditing ? "Update Policy" : "Add Policy"}
          </button>
        </form>

        {/* Cards */}
        <div className="row">
          {policies.map((p) => (
            <div className="col-md-6 col-lg-4 mb-4" key={p.policyId}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="fw-bold text-primary">{p.policyName}</h5>
                  <p className="text-muted">{p.description}</p>
                  <p>
                    <strong>Premium:</strong> ₹{p.basePremium}
                  </p>
                  <p>
                    <strong>Type:</strong> {p.vehicleType}
                  </p>
                  <span
                    className={`badge ${p.active ? "bg-success" : "bg-danger"}`}
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
