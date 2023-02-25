import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthorizationRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.login);
  let value;
  const testNavigate = () => {
    if (user?.role.includes("user")) {
      return <Navigate to="/user" />;
    } else if (user?.role.includes("admin")) {
      return <Navigate to="/admin" />;
    } else if (user?.role.includes("super_admin")) {
      return <Navigate to="/superadmin" />;
    } else {
      return <Navigate to="/login" />;
    }
  };

  switch (user?.role) {
    case role:
      value = children;
      break;
    default:
      value = testNavigate();
  }
  // console.log("value: ", value);
  // console.log("role: ", user?.role);

  return value;
};

export default AuthorizationRoute;
