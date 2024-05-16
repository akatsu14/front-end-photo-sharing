import {
  Bookmark,
  BookmarkBorder,
  Chat,
  Delete,
  Favorite,
  FavoriteBorderOutlined,
  MoreHoriz,
  Send,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Divider,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getColorForAvatar } from "../../../common/functions";
import fetchModel from "../../../lib/fetchModelData";
import LoadingComponent from "../../../lib/loading/LoadingComponent";
import { translate } from "../../../utils/i18n/translate";
import { BaseUrl, socketComment } from "../../../utils/socketComment";
import "./styles.css";
const ItemPhoto = (props) => {
  const { item, userInfo, isAdvance, isComment, listUser } = props;
  let userPostPhoto =
    userInfo?._id === item?.user_id
      ? userInfo
      : listUser.find((i) => i._id === item?.user_id);
  const navigate = useNavigate();
  const [photoData, setPhotoData] = useState(item);
  const [numOfFavorite, setNumOfFavorite] = useState(0);
  const [numOfBookmark, setNumOfBookmark] = useState(0);
  const [expanded, setExpanded] = useState(isComment);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [isFavorite, setIsFavorite] = useState(item?.isFavorite);
  const [isBookmark, setIsBookmark] = useState(item?.isBookmark);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const open = Boolean(anchorEl);

  const isUser = item?.user_id === user?._id;

  const postComment = async () => {
    try {
      setLoading(true);
      const res = await fetchModel(
        `/api/commentsOfUser/${photoData?._id}`,
        "post",
        JSON.stringify({ comment })
      );
      console.log("🚀 ~ postComment ~ res:", res);
      if (res?.success) {
        setComment("");

        setExpanded(true);
        setPhotoData(res?.data);
        socketComment.emit("sendComment");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("🚀 ~ getData ~ error:", error);
    }
  };
  const goToUser = (userId) => {
    console.log("userId", userId);
    navigate(`/users/${userId}`);
  };
  const handleFavorite = async () => {
    const res = await fetchModel(
      `/api/likeOfPhoto/${photoData?._id}`,
      isFavorite ? "delete" : "post"
    );
    socketComment.emit("likePost");
    console.log("🚀 ~ postComment ~ res:", res);
    setIsFavorite(!isFavorite);
  };
  const handleBookmark = async () => {
    const res = await fetchModel(
      `/api/bookmarkOfPhoto/${photoData?._id}`,
      isBookmark ? "delete" : "post"
    );
    socketComment.emit("bookmarkPost");
    setIsBookmark(!isBookmark);

    console.log("🚀 ~ handleBookmark ~ res:", res);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeletePost = async () => {
    try {
      setLoading(true);
      const res = await fetchModel(
        `/api/photosOfUser/${photoData?._id}`,
        "delete"
      );
      console.log("🚀 ~ postComment ~ res:", res);
      if (res?.success) {
        navigate(`/photos/${photoData?.user_id}`);
        socketComment.emit("sendComment");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("🚀 ~ getData ~ error:", error);
    }
  };
  const getInitData = async () => {
    const likeOfPhoto = await fetchModel(
      `/api/likeOfPhoto/byPhoto/${photoData?._id}`
    );
    setNumOfFavorite(likeOfPhoto?.data?.length);
    console.log("🚀 ~ getInitData ~ likeOfPhoto:", likeOfPhoto);

    const bookmarkOfPhoto = await fetchModel(
      `/api/bookmarkOfPhoto/byPhoto/${photoData?._id}`
    );
    setNumOfBookmark(bookmarkOfPhoto?.data?.length);
    console.log("🚀 ~ getInitData ~ bookmarkOfPhoto:", bookmarkOfPhoto);
  };

  useEffect(() => {
    getInitData();
  }, [isFavorite, isBookmark]);

  return (
    <Grid item xs={isAdvance ? 16 : 8} sm={12} key={photoData?._id}>
      <Card variant="outlined" key={photoData?._id}>
        <CardHeader
          title={
            <Typography
              onClick={() => goToUser(photoData?.user_id)}
              color={"blue"}
              style={{ cursor: "pointer" }}
            >
              {`${userPostPhoto?.first_name} ${userPostPhoto?.last_name}`}
            </Typography>
          }
          subheader={moment(photoData?.date_time).format("llll")}
          avatar={<Avatar sx={{ bgcolor: getColorForAvatar(userPostPhoto?.first_name?.[0]) }}>{userPostPhoto?.first_name?.[0]}</Avatar>}
          action={
            isUser ? (
              <Box>
                <IconButton onClick={handleClick} aria-label="settings">
                  <MoreHoriz />
                </IconButton>
                <Menu
                  id="account-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleDeletePost}>
                    <ListItemIcon>
                      <Delete />
                    </ListItemIcon>
                    Delete
                  </MenuItem>
                </Menu>
              </Box>
            ) : null
          }
        />
        <CardMedia
          component="img"
          sx={{
            height: isAdvance ? 300 : 500,
            objectFit: "contain",
          }}
          // loading={<Box>Loading...</Box>}
          image={
            photoData?.file_path
              ? `${BaseUrl}/${photoData?.file_path}`
              : `../../images/${photoData.file_name}`
          }
          alt={`${userPostPhoto?.first_name} Post ${BaseUrl}/${photoData?.file_path}`}
        />
        <Divider />

        <CardActions disableSpacing>
          <Stack
            direction={"row"}
            flex={1}
            justifyContent={isAdvance ? "space-around" : "space-between"}
          >
            <Box display={"flex"} alignItems={"center"}>
              <IconButton
                aria-label="add to favorites"
                onClick={handleFavorite}
                color="error"
              >
                {isFavorite ? <Favorite /> : <FavoriteBorderOutlined />}
              </IconButton>
              {numOfFavorite}
            </Box>
            <MenuItem onClick={() => setExpanded(!expanded)}>
              <Box mr={1}>
                <Chat fontSize="small" color={expanded ? "info" : "disabled"} />
              </Box>
              {translate("photoSharing:comment")}
            </MenuItem>
            <Box display={"flex"} alignItems={"center"}>
              <IconButton color="warning" onClick={handleBookmark}>
                {isBookmark ? <Bookmark /> : <BookmarkBorder />}
              </IconButton>
              {numOfBookmark}
            </Box>
          </Stack>
        </CardActions>
        <Divider />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {loading ? (
              <LoadingComponent />
            ) : photoData?.comments?.length ? (
              <List
                sx={{
                  maxHeight: 300,
                  overflow: "auto",
                  // how to hidden scrollbar
                  // "&::-webkit-scrollbar": {
                  //   display: "none",
                  // },
                }}
              >
                {[...photoData?.comments]?.reverse()?.map((items) => (
                  <ListItem key={items._id}>
                    <CommentDetail items={items} goToUser={goToUser} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>{translate("photoSharing:noComment")}</Typography>
            )}
          </CardContent>
        </Collapse>
        <Divider />
        <CardActions disableSpacing>
          <InputBase
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ ml: 1, flex: 1 }}
            placeholder={translate("photoSharing:addYourComment")}
            inputProps={{ "aria-label": "add your comment" }}
          />
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="directions"
            onClick={postComment}
          >
            <Send />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};
export default ItemPhoto;
const CommentDetail = (props) => {
  const { items, goToUser } = props;
  return (
    <div id={items?._id}>
      <Typography
        onClick={() => goToUser(items?.user?._id)}
        style={{
          display: "flex",
          cursor: "pointer",
          color: "blue",
          margin: 0,
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            bgcolor: getColorForAvatar(items?.user?.first_name?.[0]),
            mr: "12px",
          }}
        >
          {items.user?.first_name[0]}
        </Avatar>
        {`${items.user?.first_name} ${items.user?.last_name}:`}
      </Typography>
      <Typography
        variant="body1"
        color="ActiveCaption"
        className="breakall"
      >{`${items?.comment}`}</Typography>
      <Typography variant="subtitle2" color="textSecondary" textAlign={"left"}>
        {moment(items?.date_time).format("llll")}
      </Typography>
    </div>
  );
};
