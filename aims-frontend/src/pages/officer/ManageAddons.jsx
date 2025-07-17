import React, { useEffect, useState } from "react";
import OfficerSidebar from "../../components/OfficerSidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialForm = {
  addonName: "",
  description: "",
  additionalCost: "",
  addonType: "",
  policyId: "",
};

const ManageAddons = () => {
  const [addons, setAddons] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [policies, setPolicies] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("jwtToken");

  // Load addons and policies
  const loadAddons = async () => {
    try {
      const res = await fetch(`${BASE_URL}/policy-addons/all`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAddons(data);
    } catch {
      toast.error("Failed to load addons");
    }
  };

  const loadPolicies = async () => {
    try {
      const res = await fetch(`${BASE_URL}/policy/all`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setPolicies(data);
    } catch {
      toast.error("Failed to load policies");
    }
  };

  useEffect(() => {
    loadAddons();
    loadPolicies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `${BASE_URL}/policy-addons/update/${editId}`
      : `${BASE_URL}/policy-addons/add/${formData.policyId}`;

    const body = {
      addonName: formData.addonName,
      description: formData.description,
      additionalCost: parseFloat(formData.additionalCost),
      addonType: formData.addonType,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to save addon");

      toast.success(isEditing ? "Addon updated" : "Addon added");
      await loadAddons();
      setFormData(initialForm);
      setIsEditing(false);
      setEditId(null);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (addon) => {
    setFormData({
      addonName: addon.addonName,
      description: addon.description,
      additionalCost: addon.additionalCost,
      addonType: addon.addonType,
      policyId: addon.policy?.policyId || "",
    });
    setEditId(addon.addonId);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this addon?")) return;

    try {
      const res = await fetch(`${BASE_URL}/policy-addons/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Delete failed");

      toast.success("Addon deleted");
      await loadAddons();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="d-flex">
      <ToastContainer position="top-right" autoClose={3000} />
      <OfficerSidebar />

      <div className="flex-grow-1 p-4">
        <h2 className="mb-4">Manage Policy Addons</h2>

        {/* Form */}
        <form className="card p-4 mb-4 shadow-sm" onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                className="form-control"
                placeholder="Addon Name"
                value={formData.addonName}
                onChange={(e) =>
                  setFormData({ ...formData, addonName: e.target.value })
                }
                required
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                type="number"
                placeholder="Extra Cost"
                value={formData.additionalCost}
                onChange={(e) =>
                  setFormData({ ...formData, additionalCost: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
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
                value={formData.addonType}
                onChange={(e) =>
                  setFormData({ ...formData, addonType: e.target.value })
                }
                required
              >
                <option value="">Select Addon Type</option>
                <option value="EXTRA_COVER">Extra Cover</option>
                <option value="ZERO_DEP">Zero Depreciation</option>
                <option value="ROADSIDE_ASSISTANCE">Roadside Assistance</option>
              </select>
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                value={formData.policyId}
                onChange={(e) =>
                  setFormData({ ...formData, policyId: e.target.value })
                }
                required
              >
                <option value="">Select Policy</option>
                {policies.map((p) => (
                  <option key={p.policyId} value={p.policyId}>
                    {p.policyName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="btn btn-primary" type="submit">
            {isEditing ? "Update Addon" : "Add Addon"}
          </button>
        </form>

        {/* List */}
        <div className="row">
          {addons.map((a) => (
            <div className="col-md-4 mb-3" key={a.addonId}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="fw-bold">{a.addonName}</h5>
                  <p>{a.description}</p>
                  <p>
                    <strong>Extra Cost:</strong> ₹{a.additionalCost}
                  </p>
                  <p>
                    <strong>Type:</strong> {a.addonType}
                  </p>
                  <p>
                    <strong>Policy:</strong> {a.policy?.policyName || "N/A"}
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleEdit(a)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(a.addonId)}
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

export default ManageAddons;
