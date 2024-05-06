import React, { useEffect, useState } from "react";

import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const user = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const getData = () => {
    setLoading(true);
    fetchModel(`/user/${user.userId}`).then((data) => {
      setUserInfo(data);
      setLoading(false);
    });
  };
  useEffect(() => {
    user && getData();
  }, [user]);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/photos/${user.userId}`);
  };

  return loading ? (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <CircularProgress />
    </Box>
  ) : (
    <Grid container display={"flex"}>
      <Grid item xs={12}>
        <Typography variant="subtitle2" color={"gray"}>
          Tên:
        </Typography>
        <Typography variant="h6" gutterBottom>
          {userInfo?.first_name} {userInfo?.last_name}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2" color={"gray"}>
          Địa chỉ:
        </Typography>
        <Typography variant="h6" gutterBottom>
          {userInfo?.location}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2" color={"gray"}>
          Nghề nghiệp:
        </Typography>
        <Typography variant="h6" gutterBottom>
          {userInfo?.occupation}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2" color={"gray"}>
          Mô tả:
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          dangerouslySetInnerHTML={{ __html: userInfo?.description }}
        />
      </Grid>
      <Grid item textAlign={"center"} width={"100%"}>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Go to Photostream
        </Button>
      </Grid>
    </Grid>
  );
}

export default UserDetail;
