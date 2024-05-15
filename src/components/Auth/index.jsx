// import LoadingScreen from "@components/LoadingScreen";
// import { AuthContext } from "@contexts/AuthContexts";
// import { ScreenName } from "@navigates/ScreenName";
import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
// import RegisterForm from "./RegisterForm";
import RegisterForm from "./RegisterForm";
import "./styles.css";

const Auth = (props) => {
  const { authRoute } = props;
  const navigate = useNavigate();
//   const {
//     authState: { authLoading, isAuthenticated },
//   } = useContext(AuthContext);
//   if (authLoading) {
//     return <LoadingScreen />;
//   }
//   if (isAuthenticated) navigate(ScreenName.DashBoard, { replace: true });
  return (
    <div id="formLogin" className="landing">
      <div id="title" className="dark-overlay">
        <div className="landing-inner">
          <h1>Photo Sharing</h1>
          <h4>Image sharing sites that are worth trying</h4>
          {authRoute === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
