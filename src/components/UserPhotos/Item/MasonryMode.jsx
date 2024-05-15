import { Info } from "@mui/icons-material";
import Masonry from "@mui/lab/Masonry";
import {
  Dialog,
  DialogContent,
  IconButton,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import moment from "moment";
import { useState } from "react";
import ItemTrong from "../../../common/notThing/ItemTrong";
import { translate } from "../../../utils/i18n/translate";
import { BaseUrl } from "../../../utils/socketComment";
import AdvanceMode from "./AdvanceMode";
function srcset(image) {
  return {
    srcSet: `${image}?w=162&auto=format&dpr=2 2x`,
    src: `${image}?w=162&auto=format`,
  };
}

const MasonryMode = (props) => {
  const { listUser, userModel, userInfo, isComment } = props;
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  // const
  const handleClick = (index) => {
    setIndex(index);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  let imgShow = userModel[index];
  let userShow = listUser.find((i) => i._id === userModel?.[index]?.user_id);
  return userModel?.length ? (
    <Masonry columns={3} spacing={2}>
      {userModel?.map((item, index) => {
        const pathImg = item?.file_path
          ? `${BaseUrl}/${item?.file_path}`
          : `../../images/${item?.file_name}`;
        const user = listUser.find((i) => i._id === item.user_id);
        return (
          <ImageListItem
            onClick={() => handleClick(index)}
            key={index.toString()}
          >
            <img {...srcset(pathImg)} alt={item.file_name} loading="lazy" />
            <ImageListItemBar
              title={user.first_name + " " + user.last_name}
              subtitle={moment(item?.date_time).format("hh:mm DD/MM/YYYY")}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.title}`}
                >
                  <Info />
                </IconButton>
              }
            />
          </ImageListItem>
        );
      })}

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <AdvanceMode
            listUser={listUser}
            userModel={[imgShow]}
            userInfo={userShow}
            isComment={isComment}
            index={index}
          />
        </DialogContent>
      </Dialog>
    </Masonry>
  ) : (
    <ItemTrong content={translate("photoSharing:noPhoto")} />
  );
};
export default MasonryMode;
