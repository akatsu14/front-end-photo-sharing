import React, { useEffect, useState } from "react";

import { Button, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import LoadingComponent from "../../lib/loading/LoadingComponent";
import { translate } from "../../utils/i18n/translate";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const user = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetchModel(`/api/user/${user.userId}`);
      if (res?.success) setUserInfo(res?.data);
      setLoading(false);
    } catch (error) {
      console.log("🚀 ~ getData ~ error:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    user && getData();
  }, [user]);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/photos/${user.userId}`);
  };

  return loading ? (
    <LoadingComponent />
  ) : (
    <Grid container display={"flex"}>
      <Grid item xs={12}>
        <Typography variant="subtitle2" color={"gray"}>
          {translate("photoSharing:fullName")}:
        </Typography>
        <Typography variant="h6" gutterBottom>
          {userInfo?.first_name} {userInfo?.last_name}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2" color={"gray"}>
          {translate("photoSharing:location")}:
        </Typography>
        <Typography variant="h6" gutterBottom>
          {userInfo?.location}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2" color={"gray"}>
          {translate("photoSharing:occupation")}:
        </Typography>
        <Typography variant="h6" gutterBottom>
          {userInfo?.occupation}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2" color={"gray"}>
          {translate("photoSharing:description")}:
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          dangerouslySetInnerHTML={{ __html: userInfo?.description }}
        />
      </Grid>
      <Grid item textAlign={"center"} width={"100%"}>
        <Button variant="contained" color="primary" onClick={handleClick}>
          {translate("photoSharing:goToPhotostream")}
        </Button>
      </Grid>
    </Grid>
  );
}

export default UserDetail;
