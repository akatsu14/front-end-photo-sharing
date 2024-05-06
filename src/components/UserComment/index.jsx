import React, { useState, useEffect } from "react";
import fetchModel from "../../lib/fetchModelData";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import AdvanceMode from "../UserPhotos/Item/AdvanceMode";
const UserComment = (props) => {
  const { setIsAdvance, isAdvance } = props;
  const [listComment, setListComment] = useState([]);
  const [listPhoto, setListPhoto] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState();
  const [index, setIndex] = useState(0);
  const user = useParams();
  const getData = async () => {
    try {
      setLoading(true);
      const postUserComment = await fetchModel(
        `/commentsOfUser/${user.userId}`,
      );
      console.log("postUserComment", postUserComment);
      setListPhoto(postUserComment);
      const resUser = await fetchModel(`/user/${user.userId}`);
      setUserInfo(resUser);
      const comment = [];
      postUserComment?.map((i) => {
        i.comments.map((item) => {
          if (item.user._id === user.userId)
            comment.push({ ...item, post_id: i._id });
        });
      });
      setListComment(comment);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
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
      userModel={listPhoto}
      userInfo={userInfo}
      isComment={true}
      index={index}
    />
  ) : (
    <Stack spacing={2}>
      {listComment?.map((items) => {
        const goToAdvance = () => {
          setIsAdvance(true);
          setIndex(listPhoto.findIndex((i) => i._id == items.post_id));
        };
        console.log(items);
        const postComment = listPhoto.find((i) => i._id == items.post_id);
        return (
          <Stack
            direction="row"
            key={items?._id}
            spacing={1}
            style={{ cursor: "pointer" }}
            onClick={() => goToAdvance()}
          >
            <img
              src={`../../images/${postComment.file_name}`}
              alt={postComment.file_name}
              loading="lazy"
              style={{ objectFit: "cover", height: "100px", width: "100px" }}
            />
            <Stack>
              <Typography
                onClick={() => goToUser(items?.user?.id)}
                style={{
                  display: "flex",
                  cursor: "pointer",
                  color: "blue",
                  margin: 0,
                  alignItems: "center",
                }}
              >
                <Avatar style={{ marginRight: "12px" }}>
                  {items?.user?.first_name[0]}
                </Avatar>
                {`${items?.user?.first_name} ${items?.user?.last_name}:`}
              </Typography>
              <Typography>{`${items?.comment}`}</Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                textAlign={"right"}
              >
                {moment(items?.date_time).format("hh:mm DD/MM/YYYY")}
              </Typography>
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
};
export default UserComment;
