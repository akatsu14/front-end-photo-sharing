import {
  Avatar,
  Divider,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import fetchModel from "../../../lib/fetchModelData";
import { setBasic } from "../../../redux/actions/modeAction";
import { socketComment } from "../../../utils/socketComment";

const ItemUser = (props) => {
  const { item, handleClick, isLast } = props;
  const [numOfPhotos, setNumOfPhotos] = useState(0);
  const [numOfComment, setNumOfComment] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const arrPath = pathname?.split("/");

  const getData = async () => {
    try {
      const photos = await fetchModel(`/api/photosOfUser/${item?._id}`);
      if (photos?.success) setNumOfPhotos(photos?.data?.length);
      console.log("🚀 ~ getData ~ photos:", photos);
      const photoUserComment = await fetchModel(
        `/api/commentsOfUser/${item?._id}`
      );
      let count = 0;
      if (photoUserComment?.success)
        photoUserComment?.data?.map((i) =>
          i?.comments?.map((items) => {
            if (items.user._id == item?._id) count++;
          })
        );

      setNumOfComment(count);
    } catch (error) {
      console.log("🚀 ~ getData ~ error:", error);
    }
  };
  const goToPhotoUserComment = (userId) => {
    dispatch(setBasic());
    navigate(`/commentOfUser/${userId}`);
  };
  const goToPhotosOfUser = (userId) => {
    navigate(`/photos/${userId}`);
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    socketComment.on("commented", () => getData());
  }, [socketComment]);
  return (
    <Typography style={{ cursor: "pointer" }}>
      <ListItem>
        <Stack direction="row" flex={1}>
          <ListItemText
            primary={`${item?.first_name}`}
            onClick={() => handleClick(item?._id)}
          />
          <Stack direction="row" spacing={0.5} alignItems={"center"}>
            {numOfComment ? (
              <Avatar
                onClick={() => goToPhotoUserComment(item?._id)}
                sx={{ backgroundColor: "#d32f2f", width: 24, height: 24 }}
              >
                <Typography variant="body2" color={"whitesmoke"}>
                  {numOfComment}
                </Typography>
              </Avatar>
            ) : null}
            {numOfPhotos ? (
              <Avatar
                onClick={() => goToPhotosOfUser(item?._id)}
                sx={{ backgroundColor: "#2e7d32", width: 24, height: 24 }}
              >
                <Typography variant="body2" color={"whitesmoke"}>
                  {numOfPhotos}
                </Typography>
              </Avatar>
            ) : (
              <></>
            )}
          </Stack>
        </Stack>
      </ListItem>
      {!isLast && <Divider />}
    </Typography>
  );
};
export default ItemUser;
