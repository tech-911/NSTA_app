import React from "react";
import Landing from "./pages/landing/Landing";
import { Route, Routes } from "react-router-dom";
import "./App.scss";

// --------------Error pages import-------------------------
import PageNotFound from "./pages/error/NotFound";
import CommingSoon from "./pages/error/construction";

// --------------Authentication/authorization-------------------------
import Signup from "./pages/authentication/signup/Signup";
import Login from "./pages/authentication/login/Login";
import AuthorizationRoute from "./AuthorizationRoute";

// --------------User pages import-------------------------
import User from "./pages/protected/user";
import Booking from "./pages/protected/user/booking/Booking";
import Transactions from "./pages/protected/user/transaction/Transaction";
import History from "./pages/protected/user/history/History";
import Settings from "./pages/protected/user/settings/Settings";
import DetailsTransaction from "./pages/protected/user/transaction/DetailsTransaction";
import Paystack from "./components/paystack/PayStack";

//---------------Admin pages import------------------------
import Admin from "./pages/protected/admin";
import Dashboard from "./pages/protected/admin/dashboard/Dashboard";
import AdminDetails from "./pages/protected/admin/dashboard/Details";
import AdminHistory from "./pages/protected/admin/history/History";
import AdminSettings from "./pages/protected/admin/settings/Settings";

//---------------SuperAdmin pages import-------------------
import Superadmin from "./pages/protected/superadmin";
import SuperAdminDashboard from "./pages/protected/superadmin/dashboard/Dashboard";
import Details from "./pages/protected/superadmin/dashboard/Details";
import CreateAdmin from "./pages/protected/superadmin/createAdmin/CreateAdmin";
import SuperAdminHistory from "./pages/protected/superadmin/history/History";
import SuperAdminSettings from "./pages/protected/superadmin/settings/Settings";

const App = () => {
  return (
    <div className="app_wrapper">
      <Routes>
        {/* --------------external pages------------------ */}
        <Route path="/" element={<Landing />} />
        <Route path="/comming" element={<CommingSoon />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        {/* --------------internal pages (Proctected)---------------*/}
        <Route
          path="/user"
          element={
            <AuthorizationRoute role="user">
              <User />
            </AuthorizationRoute>
          }
        >
          <Route index element={<Booking />} />
          <Route path="/user/booking" element={<Booking />} />
          <Route path="/user/details" element={<DetailsTransaction />} />
          <Route path="/user/paystack" element={<Paystack />} />
          <Route path="/user/transaction" element={<Transactions />} />
          <Route path="/user/history" element={<History />} />
          <Route path="/user/settings" element={<Settings />} />
        </Route>
        <Route
          path="/admin"
          element={
            <AuthorizationRoute role="admin">
              <Admin />
            </AuthorizationRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/history" element={<AdminHistory />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/details" element={<AdminDetails />} />
        </Route>
        <Route
          path="/superadmin"
          element={
            <AuthorizationRoute role="super_admin">
              <Superadmin />
            </AuthorizationRoute>
          }
        >
          <Route index element={<SuperAdminDashboard />} />
          <Route
            path="/superadmin/dashboard"
            element={<SuperAdminDashboard />}
          />
          <Route path="/superadmin/details" element={<Details />} />

          <Route path="/superadmin/createadmin" element={<CreateAdmin />} />
          <Route path="/superadmin/history" element={<SuperAdminHistory />} />
          <Route path="/superadmin/settings" element={<SuperAdminSettings />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
