import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../common/loading/LoadingComponent";
import fetchModel from "../../lib/fetchModelData";
import AdvanceMode from "./Item/AdvanceMode";
import BasicMode from "./Item/BasicMode";
import MasonryMode from "./Item/MasonryMode";
/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos(props) {
  const navigate = useNavigate();
  const userCurrentView = useParams();
  const { isComment } = props;

  const [userInfo, setUserInfo] = useState({});
  const [userModel, setUserModel] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAdvance, isBasic } = useSelector((state) => state.mode);
  const { user } = useSelector((state) => state.auth);
  const getData = async () => {
    setLoading(true);
    const urlPhoto = isComment
      ? `/api/commentsOfUser/${userCurrentView.userId}`
      : `/api/photosOfUser/${userCurrentView.userId}`;
    const dataUserInfo = await fetchModel(`/api/user/${userCurrentView.userId}`);
    const dataUserModel = await fetchModel(urlPhoto);
    const listDataUserInfo = await fetchModel(`/api/user/list`);
    const likeOfPhoto = await fetchModel(`/api/likeOfPhoto/byUser/${user._id}`);
    const bookmarkOfPhoto = await fetchModel(
      `/api/bookmarkOfPhoto/byUser/${user._id}`
    );
    dataUserModel?.data?.map((i) => {
      i.isFavorite = likeOfPhoto?.data?.find((j) => j.post_id === i?._id);
      i.isBookmark = bookmarkOfPhoto?.data?.find((j) => j.post_id === i?._id);
    });
    console.log(
      "🚀 ~ dataUserModel?.data?.map ~ dataUserModel:",
      dataUserModel
    );
    if (dataUserInfo?.success) setUserInfo(dataUserInfo?.data);
    if (dataUserModel?.success) setUserModel(dataUserModel?.data);
    if (listDataUserInfo?.success) setListUser(listDataUserInfo?.data);
    // setListUser(listDataUserInfo);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [userCurrentView]);

  return loading ? (
    <LoadingComponent />
  ) : isAdvance ? (
    <AdvanceMode
      listUser={listUser}
      userModel={userModel}
      userInfo={userInfo}
      isComment={isComment}
    />
  ) : isBasic ? (
    <BasicMode
      listUser={listUser}
      userModel={userModel}
      userInfo={userInfo}
      isComment={isComment}
    />
  ) : (
    <MasonryMode
      listUser={listUser}
      userModel={userModel}
      userInfo={userInfo}
      isComment={isComment}
    />
  );
}

export default UserPhotos;
