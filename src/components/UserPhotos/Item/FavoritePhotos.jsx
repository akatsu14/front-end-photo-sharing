import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fetchModel from "../../../lib/fetchModelData";
import LoadingComponent from "../../../lib/loading/LoadingComponent";
import { socketComment } from "../../../utils/socketComment";
import MasonryMode from "./MasonryMode";

const FavoritePhotos = () => {
  const [userModel, setUserModel] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const getData = async () => {
    setLoading(true);

    const dataUserModel = await fetchModel(`/api/photosOfUser/list`);
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
    if (dataUserModel?.success)
      setUserModel(dataUserModel?.data?.filter((i) => i.isFavorite));
    if (listDataUserInfo?.success) setListUser(listDataUserInfo?.data);
    // setListUser(listDataUserInfo);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    socketComment.on("liked", () => getData());
  }, [socketComment]);
  return loading ? (
    <LoadingComponent />
  ) : (
    <MasonryMode listUser={listUser} userModel={userModel} userInfo={user} />
  );
};
export default FavoritePhotos;
