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
import IssuedPolicies from "./pages/officer/IssuedPolicies";
import RegisteredUsers from "./pages/officer/RegisteredUsers";
import PaymentOverview from "./pages/officer/PaymentOverview";
import ViewProposalDocuments from "./pages/officer/ViewProposalDocuments";

import UserDashboard from "./pages/user/UserDashboard";
import ApplyProposalPage from "./pages/user/ApplyProposal";
import MyProposals from "./pages/user/MyProposals";
import MyVehicles from "./pages/user/MyVehicles";
import PaymentScreen from "./pages/user/PaymentScreen";
import MyPolicies from "./pages/user/MyPolicies";
import MyPayments from "./pages/user/MyPayments";

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
        <Route path="/officer/issued-policies" element={<IssuedPolicies />} />
        <Route path="/officer/registered-users" element={<RegisteredUsers />} />
        <Route path="/admin/payments" element={<PaymentOverview />} />
        <Route
          path="/officer/proposals/:proposalId/documents"
          element={<ViewProposalDocuments />}
        />

        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/proposal/new" element={<ApplyProposalPage />} />
        <Route path="/user/proposals" element={<MyProposals />} />
        <Route path="/user/my-vehicles" element={<MyVehicles />} />
        <Route path="/user/pay" element={<PaymentScreen />} />
        <Route path="/user/my-policies" element={<MyPolicies />} />
        <Route path="/user/my-payments" element={<MyPayments />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
