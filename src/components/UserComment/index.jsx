import { Avatar, Stack, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getColorForAvatar } from "../../common/functions";
import fetchModel from "../../lib/fetchModelData";
import LoadingComponent from "../../lib/loading/LoadingComponent";
import ItemTrong from "../../lib/notThing/ItemTrong";
import { setAdvance } from "../../redux/actions/modeAction";
import { translate } from "../../utils/i18n/translate";
import { BaseUrl } from "../../utils/socketComment";
import AdvanceMode from "../UserPhotos/Item/AdvanceMode";
import "./styles.css";
const UserComment = (props) => {
  const [listComment, setListComment] = useState([]);
  const [listPhoto, setListPhoto] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState();
  const [index, setIndex] = useState(0);

  const userCurrentView = useParams();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { isAdvance } = useSelector((state) => state.mode);
  console.log("🚀 ~ UserComment ~ isAdvance:", isAdvance);
  const getData = async () => {
    try {
      setLoading(true);
      const postUserComment = await fetchModel(
        `/api/commentsOfUser/${userCurrentView.userId}`
      );
      const likeOfPhoto = await fetchModel(
        `/api/likeOfPhoto/byUser/${user._id}`
      );
      const bookmarkOfPhoto = await fetchModel(
        `/api/bookmarkOfPhoto/byUser/${user._id}`
      );
      const listUser = await fetchModel(`/api/user/list`);
      if (listUser?.success) setListUser(listUser?.data);
      if (postUserComment?.success) {
        postUserComment?.data?.map((i) => {
          i.isFavorite = likeOfPhoto?.data?.find((j) => j.post_id === i?._id);

          i.isBookmark = bookmarkOfPhoto?.data?.find(
            (j) => j.post_id === i?._id
          );
        });
        setListPhoto(postUserComment?.data);
      }
      const resUser = await fetchModel(`/api/user/${userCurrentView.userId}`);
      if (resUser?.success) setUserInfo(resUser?.data);
      const comment = [];
      if (postUserComment?.success)
        postUserComment?.data?.map((i) => {
          i.comments.map((item) => {
            if (item.user._id === userCurrentView.userId)
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
  }, [userCurrentView]);
  return loading ? (
    <LoadingComponent />
  ) : listComment?.length > 0 ? (
    isAdvance ? (
      <AdvanceMode
        listUser={listUser}
        userModel={listPhoto}
        userInfo={userInfo}
        isComment={true}
        index={index}
      />
    ) : (
      <Stack spacing={2}>
        {listComment?.map((items, index) => {
          const goToAdvance = () => {
            dispatch(setAdvance());
            setIndex(index);
          };
          const postComment = listPhoto.find((i) => i?._id == items?.post_id);
          console.log("🚀 ~ {listComment?.map ~ postComment:", postComment);
          return (
            <Stack
              direction="row"
              key={items?._id}
              spacing={1}
              style={{ cursor: "pointer" }}
              onClick={() => goToAdvance()}
            >
              <img
                src={
                  postComment?.file_path
                    ? `${BaseUrl}/${postComment?.file_path}`
                    : `../../images/${postComment?.file_name}`
                }
                alt={postComment?.file_name}
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
                  <Avatar
                    sx={{
                      bgcolor: getColorForAvatar(items?.user?.first_name?.[0]),
                      mr: "12px",
                    }}
                  >
                    {items?.user?.first_name[0]}
                  </Avatar>
                  {`${items?.user?.first_name} ${items?.user?.last_name}:`}
                </Typography>
                <Typography className="breakword">{`${items?.comment}`}</Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  textAlign={"left"}
                >
                  {moment(items?.date_time).format("llll")}
                </Typography>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    )
  ) : (
    <ItemTrong content={translate("photoSharing:youNotCommentToPhoto")} />
  );
};
export default UserComment;
