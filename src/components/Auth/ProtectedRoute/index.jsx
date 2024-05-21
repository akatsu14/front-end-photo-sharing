import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingComponent from "../../../lib/loading/LoadingComponent";
const ProtectedRoute = ({ user, children }) => {
  const { isAuthenticated, authLoading } = useSelector((state) => state.auth);
  if (authLoading) {
    return <LoadingComponent loading={authLoading} />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default ProtectedRoute;
