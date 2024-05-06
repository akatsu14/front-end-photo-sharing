import {
  AppBar,
  Checkbox,
  FormControlLabel,
  Toolbar,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar(props) {
  const { isAdvance, setIsAdvance } = props;
  const { pathname } = useLocation();
  const arrPath = pathname.split("/");
  const [userInfor, setUserInfor] = useState();
  const [loading, setLoading] = useState(false);
  const getData = () => {
    setLoading(true);
    fetchModel(`/user/${arrPath[2]}`).then((data) => {
      setUserInfor(data);
      setLoading(false);
    });
  };
  useEffect(() => {
    arrPath[2] && getData();
  }, [arrPath[2]]);
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" color="inherit">
          Lương Đức Mạnh
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              accessKey="advance-mode"
              sx={{
                "&.Mui-checked": {
                  color: green["A400"],
                },
              }}
              onChange={() => setIsAdvance(!isAdvance)}
              checked={isAdvance}
            />
          }
          label="Advance mode"
        />
        {userInfor == null ? (
          <Typography key={"unChoose"}>
            Vui lòng chọn người để xem ảnh
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
            key={userInfor._id}
          >
            {arrPath[1] == "photos" && "Photos of "}
            {arrPath[1] == "users" && "Info of "}
            {arrPath[1] == "commentOfUser" && "Comments of "}
            {userInfor && `${userInfor?.first_name} ${userInfor?.last_name} `}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
