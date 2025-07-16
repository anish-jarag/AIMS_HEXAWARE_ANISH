import React, { useEffect, useState } from "react";
import OfficerSidebar from "../../components/OfficerSidebar";

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

  // Load addons and policies
  const loadAddons = async () => {
    const res = await fetch("http://localhost:8080/api/policy-addons/all", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });
    const data = await res.json();
    setAddons(data);
  };

  const loadPolicies = async () => {
    const res = await fetch("http://localhost:8080/api/policy/all", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });
    const data = await res.json();
    setPolicies(data);
  };

  useEffect(() => {
    loadAddons();
    loadPolicies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEditing
      ? `http://localhost:8080/api/policy-addons/update/${editId}`
      : `http://localhost:8080/api/policy-addons/add/${formData.policyId}`;

    const method = isEditing ? "PUT" : "POST";

    const body = {
      addonName: formData.name,
      description: formData.description,
      additionalCost: parseFloat(formData.extraCost),
      addonType: formData.addonType,
    };

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      await loadAddons();
      setFormData(initialForm);
      setIsEditing(false);
      setEditId(null);
    } else {
      alert("Failed to save addon");
    }
  };

  const handleEdit = (addon) => {
    setFormData({
      name: addon.addonName,
      description: addon.description,
      extraCost: addon.additionalCost,
      addonType: addon.addonType,
      policyId: addon.policy ? addon.policy.policyId : "",
    });
    setEditId(addon.addonId);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this addon?")) return;

    const res = await fetch(
      `http://localhost:8080/api/policy-addons/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      }
    );
    if (res.ok) {
      await loadAddons();
    } else {
      alert("Failed to delete addon");
    }
  };

  return (
    <div className="d-flex">
      <OfficerSidebar />

      <div className="flex-grow-1 p-4">
        <h2 className="mb-4">Manage Policy Addons</h2>

        {/* Addon Form */}
        <form className="card p-4 mb-4 shadow-sm" onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                className="form-control"
                placeholder="Addon Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                type="number"
                placeholder="Extra Cost"
                value={formData.extraCost}
                onChange={(e) =>
                  setFormData({ ...formData, extraCost: e.target.value })
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

        {/* Addons List */}
        <div className="row">
          {addons.map((a) => (
            <div className="col-md-4 mb-3" key={a.addonId}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5>{a.name}</h5>
                  <p>{a.description}</p>
                  <p>
                    <strong>Extra Cost:</strong> ₹{a.extraCost}
                  </p>
                  <p>
                    <strong>Type:</strong> {a.addonType}
                  </p>
                  <p>
                    <strong>Policy:</strong>{" "}
                    {a.policy && a.policy.policyName
                      ? a.policy.policyName
                      : "N/A"}
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
