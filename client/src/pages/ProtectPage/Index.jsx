import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; 
import { Navigate, useLocation } from "react-router-dom";

const ProtectPage = ({ children }) => {
  const { user,isLoading } = useContext(AuthContext);
  const location = useLocation
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectPage;
