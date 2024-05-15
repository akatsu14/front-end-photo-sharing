import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingComponent from "../../../common/loading/LoadingComponent";
function ProtectedRoot({ user, children }) {
  const auth = useSelector((state) => state.auth);
  console.log("🚀 ~ ProtectedRoot ~ auth:", auth)
  
  console.log("🚀 ~ ProtectedRoot ~ auth:", auth);
  const { isAuthenticated, authLoading } = auth;
  if (authLoading) {
    return <LoadingComponent loading={authLoading} />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default ProtectedRoot;
