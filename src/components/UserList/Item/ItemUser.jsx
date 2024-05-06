import {
  Chip,
  Divider,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import fetchModel from "../../../lib/fetchModelData";
const ItemUser = (props) => {
  const { item, handleClick, setIsAdvance } = props;
  const [numOfPhotos, setNumOfPhotos] = useState(0);
  const [numOfComment, setNumOfComment] = useState(0);
  const navigate = useNavigate();
  const getData = async () => {
    const photos = await fetchModel(`/photosOfUser/${item?._id}`);
    console.log("photos", photos);
    setNumOfPhotos(photos.length);
    const photoUserComment = await fetchModel(`/commentsOfUser/${item?._id}`);
    let count = 0;
    photoUserComment.map((i) =>
      i?.comments?.map((items) => {
        if (items.user._id == item?._id) count++;
      }),
    );
    console.log(count);
    setNumOfComment(count);
  };
  useEffect(() => {
    getData();
  }, []);
  const goToPhotoUserComment = () => {
    setIsAdvance(false);
    navigate(`/commentOfUser/${item?._id}`);
  };
  return (
    <Typography style={{ cursor: "pointer" }}>
      <ListItem>
        <Stack direction="row" flex={1}>
          <ListItemText
            primary={`${item?.first_name}`}
            onClick={() => handleClick(item?._id)}
          />
          <Stack direction="row" spacing={0.5} alignItems={"center"}>
            {numOfPhotos ? (
              <Chip size="small" label={numOfPhotos} color="success" />
            ) : (
              <></>
            )}
            {numOfComment ? (
              <Chip
                size="small"
                label={numOfComment}
                color="error"
                onClick={goToPhotoUserComment}
              />
            ) : (
              <></>
            )}
          </Stack>
        </Stack>
      </ListItem>
      <Divider />
    </Typography>
  );
};
export default ItemUser;
