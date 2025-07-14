import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import OfficerDashboard from "./pages/officer/OfficerDashboard";
import ManagePolicies from "./pages/officer/ManagePolicies";
import ManageAddons from "./pages/officer/ManageAddons";
import ManageProposals from "./pages/officer/ManageProposals";
import ProposalDetails from "./pages/officer/ProposalDetails";

import UserDashboard from "./pages/user/UserDashboard";
import ApplyProposalPage from "./pages/user/ApplyProposal";
import MyProposals from "./pages/user/MyProposals";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin/dashboard" element={<OfficerDashboard />} />
        <Route path="/admin/policies" element={<ManagePolicies />} />
        <Route path="/admin/addons" element={<ManageAddons />} />
        <Route path="/admin/proposals" element={<ManageProposals />} />
        <Route
          path="/admin/proposals/:proposalId"
          element={<ProposalDetails />}
        />

        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/proposal/new" element={<ApplyProposalPage />} />
        <Route path="/user/proposals" element={<MyProposals />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
