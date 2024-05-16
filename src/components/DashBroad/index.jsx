import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import LoadingComponent from "../../lib/loading/LoadingComponent";
import { socketChat } from "../../utils/socketComment";
import TopBar from "../TopBar";
import HomePage from "./Item/HomePage";
import Welcome from "./Item/Welcome";
import "./styles.css";
const DashBoard = (props) => {
  const { isHaveUserList } = props;
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, authLoading, user } = auth;
  console.log("🚀 ~ DashBoard ~ auth:", auth);
  useEffect(() => {
    if (user) {
      socketChat.emit("user-online", user._id);

      window.addEventListener("beforeunload", () => {
        socketChat.emit("user-offline", user._id);
      });
    }
  }, [socketChat, user]);

  return (
    <Grid container bgcolor={"#E4E6EB"}>
      <Grid item xs={12} sm={12}>
        {true && <TopBar />}
      </Grid>
      <Grid item xs={12} sm={12}>
        {authLoading ? (
          <LoadingComponent loading={authLoading} />
        ) : !isAuthenticated ? (
          <Welcome />
        ) : (
          <HomePage isHaveUserList={isHaveUserList} />
        )}
      </Grid>
    </Grid>
  );
};
export default DashBoard;
