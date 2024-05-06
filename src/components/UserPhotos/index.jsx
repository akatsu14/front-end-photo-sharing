import { Box, CircularProgress, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";
import AdvanceMode from "./Item/AdvanceMode";
import BasicMode from "./Item/BasicMode";
/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos(props) {
  const navigate = useNavigate();
  const user = useParams();
  const { isAdvance, isComment } = props;
  const [userInfo, setUserInfo] = useState({});
  const [userModel, setUserModel] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    const urlPhoto = isComment
      ? `/commentsOfUser/${user.userId}`
      : `/photosOfUser/${user.userId}`;
    const dataUserInfo = await fetchModel(`/user/${user.userId}`);
    const dataUserModel = await fetchModel(urlPhoto);
    const listDataUserInfo = await fetchModel(`/user/list`);
    setUserInfo(dataUserInfo);
    setUserModel(dataUserModel);
    setListUser(listDataUserInfo);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [user]);

  return loading ? (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <CircularProgress />
    </Box>
  ) : isAdvance ? (
    <AdvanceMode
      listUser={listUser}
      userModel={userModel}
      userInfo={userInfo}
      isComment={isComment}
    />
  ) : (
    <BasicMode
      listUser={listUser}
      userModel={userModel}
      userInfo={userInfo}
      isComment={isComment}
    />
  );
}

export default UserPhotos;
