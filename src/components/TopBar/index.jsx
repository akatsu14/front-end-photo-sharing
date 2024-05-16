import { AutoAwesomeMosaicOutlined } from "@mui/icons-material";
import {
  AppBar,
  Button,
  ListItemIcon,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import { translate } from "../../utils/i18n/translate";
import UserMenu from "./Item/UserMenu";
import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar(props) {
  const { pathname } = useLocation();
  const arrPath = pathname?.split("/");
  const navigate = useNavigate();
  const [currentViewUserInfor, setCurrentViewUserInfor] = useState();
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth);

  console.log("🚀 ~ TopBar ~ auth:", auth);
  const { isAuthenticated, authLoading, user } = auth;

  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetchModel(`/api/user/${arrPath[2]}`);
      if (res?.success) setCurrentViewUserInfor(res?.data);
      setLoading(false);
    } catch (error) {
      console.log("🚀 ~ getData ~ error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [arrPath[2]]);
  console.log("arrPath[1] != me", arrPath[1] != "me");
  return (
    <AppBar className="topbar-appBar">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction={"row"} alignItems={"center"}>
          <ListItemIcon onClick={() => navigate("/")}>
            <AutoAwesomeMosaicOutlined
              fontSize="large"
              sx={{ color: "white" }}
            />
          </ListItemIcon>
          {!isAuthenticated ? (
            <></>
          ) : !arrPath?.[1] ||
            (currentViewUserInfor == null && arrPath[1] !== "me") ? (
            <Typography key={"unChoose"}>
              {translate("photoSharing:selectToView")}
            </Typography>
          ) : loading ? (
            <Typography variant="h5" color="inherit" textAlign={"right"}>
              Loading...
            </Typography>
          ) : (
            <Typography
              variant="h5"
              color="inherit"
              textAlign={"right"}
              key={currentViewUserInfor?._id}
            >
              {arrPath[1] == "photos" &&
                `${translate("photoSharing:photosOf")} `}
              {arrPath[1] == "users" && `${translate("photoSharing:infoOf")} `}
              {arrPath[1] == "commentOfUser" &&
                `${translate("photoSharing:commentsOf")} `}
              {arrPath?.[1] != "me" && arrPath?.[1]
                ? currentViewUserInfor?._id === user?._id
                  ? translate("photoSharing:me")
                  : `${currentViewUserInfor?.first_name} ${currentViewUserInfor?.last_name}`
                : ""}
            </Typography>
          )}
        </Stack>
        <Stack
          visibility={isAuthenticated ? "visible" : "hidden"}
          direction={"row"}
          spacing={2}
        >
          <MenuItem
            onClick={() => {
              navigate("/");
            }}
          >
            <Typography color="inherit">
              {translate("photoSharing:dashboard")}
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => navigate("/me/favorite")}>
            <Typography color="inherit">
              {translate("photoSharing:favoriteList")}
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => navigate("/me/bookmark")}>
            <Typography color="inherit">
              {translate("photoSharing:bookmarkList")}
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => navigate("/me/chat")}>
            <Typography color="inherit">
              {translate("photoSharing:chat")}
            </Typography>
          </MenuItem>
        </Stack>
        <UserMenu userInfo={user} visible={isAuthenticated} />
        {!isAuthenticated && !authLoading && (
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
