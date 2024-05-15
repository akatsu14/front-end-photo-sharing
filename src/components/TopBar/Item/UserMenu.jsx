import {
  AccountCircle,
  BorderColor,
  Chat,
  Check,
  Forum,
  Language,
  Logout,
  Settings,
} from "@mui/icons-material";
import {
  Avatar,
  Chip,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Flag } from "semantic-ui-react";
import { logout } from "../../../common/functions";
import fetchModel from "../../../lib/fetchModelData";
import {
  setEnglish,
  setVietnamese,
} from "../../../redux/actions/languageAction";
import {
  setAdvance,
  setBasic,
  setSticky,
} from "../../../redux/actions/modeAction";
import i18n from "../../../utils/i18n/i18n";
import { translate } from "../../../utils/i18n/translate";
import UserUpdateInfor from "./UserUpdateInfor";

const UserMenu = (props) => {
  const { userInfo, visible } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [numOfComment, setNumOfComment] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  console.log("🚀 ~ UserMenu ~ isOpen:", isOpen);
  const { isAdvance, isBasic, isSticky } = useSelector((state) => state.mode);
  const { language } = useSelector((state) => state.language);

  const getData = async () => {
    try {
      const photoUserComment = await fetchModel(
        `/api/commentsOfUser/${userInfo?._id}`
      );
      let count = 0;
      if (photoUserComment?.success)
        photoUserComment?.data?.map((i) =>
          i?.comments?.map((items) => {
            if (items.user._id == userInfo?._id) count++;
          })
        );

      setNumOfComment(count);
    } catch (error) {
      console.log("🚀 ~ getData ~ error:", error);
    }
  };
  useEffect(() => {
    getData();
  }, [anchorEl]);
  console.log("🚀 ~ UserMenu ~ numOfComment:", numOfComment);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleClose();
    logout(dispatch);
    navigate("/");
  };
  const goToMyInfo = () => {
    handleClose();
    navigate(`/users/${userInfo?._id}`);
  };
  const goToPhotoUserComment = () => {
    dispatch(setBasic());
    handleClose();
    navigate(`/commentOfUser/${userInfo?._id}`);
  };
  const handleUpdate = () => {
    handleClose();
    setIsOpen(true);
  };

  return (
    <div>
      <Stack
        direction="row"
        alignItems={"center"}
        spacing={2}
        visibility={visible ? "visible" : "hidden"}
        onClick={handleClick}
        sx={{ cursor: "pointer" }}
      >
        <Avatar>{userInfo?.first_name?.[0]}</Avatar>
        <Typography variant="h5" color="inherit">
          {userInfo?.first_name} {userInfo?.last_name}
        </Typography>
      </Stack>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={goToMyInfo}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          {translate("photoSharing:profile")}
        </MenuItem>
        <MenuItem onClick={goToPhotoUserComment}>
          <ListItemIcon>
            <Chat fontSize="small" />
          </ListItemIcon>
          {translate("photoSharing:myComments")}
          {numOfComment ? (
            <Chip
              avatar={
                <Avatar sx={{ backgroundColor: "#d32f2f" }}>
                  <Typography color={"whitesmoke"}>{numOfComment}</Typography>
                </Avatar>
              }
              sx={{ backgroundColor: "transparent" }}
            />
          ) : null}
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/chat");
          }}
        >
          <ListItemIcon>
            <Forum fontSize="small" />
          </ListItemIcon>
          {translate("photoSharing:chat")}
        </MenuItem>
        <MenuItem onClick={handleUpdate}>
          <ListItemIcon>
            <BorderColor fontSize="small" />
          </ListItemIcon>
          {translate("photoSharing:updateInformation")}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {translate("photoSharing:logout")}
        </MenuItem>
        <Divider />
        <MenuList dense>
          <MenuItem disableTouchRipple>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            {translate("photoSharing:setting")}
          </MenuItem>
          <MenuItem onClick={() => dispatch(setBasic())}>
            <ListItemText inset>
              {translate("photoSharing:basicMode")}
            </ListItemText>
            <ListItemIcon sx={{ visibility: isBasic ? "visible" : "hidden" }}>
              <Check color="success" />
            </ListItemIcon>
          </MenuItem>

          <MenuItem onClick={() => dispatch(setAdvance())}>
            <ListItemText inset>
              {translate("photoSharing:advanceMode")}
            </ListItemText>
            <ListItemIcon sx={{ visibility: isAdvance ? "visible" : "hidden" }}>
              <Check color="success" />
            </ListItemIcon>
          </MenuItem>

          <MenuItem onClick={() => dispatch(setSticky())}>
            <ListItemText inset>
              {translate("photoSharing:masonryMode")}
            </ListItemText>
            <ListItemIcon sx={{ visibility: isSticky ? "visible" : "hidden" }}>
              <Check color="success" />
            </ListItemIcon>
          </MenuItem>
        </MenuList>
        <Divider />
        <MenuList dense>
          <MenuItem disableTouchRipple>
            <ListItemIcon>
              <Language fontSize="small" />
            </ListItemIcon>
            {translate("photoSharing:language")}
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setVietnamese());
              i18n.changeLanguage("vi");
            }}
          >
            <ListItemText inset>
              <ListItemIcon>
                <Flag name="vn" />
              </ListItemIcon>
              {translate("photoSharing:vietnamese")}
            </ListItemText>
            <ListItemIcon
              sx={{ visibility: language === "vi" ? "visible" : "hidden" }}
            >
              <Check color="success" />
            </ListItemIcon>
          </MenuItem>

          <MenuItem
            onClick={() => {
              dispatch(setEnglish());
              i18n.changeLanguage("en");
            }}
          >
            <ListItemText inset>
            <ListItemIcon>
                <Flag name="us" />
              </ListItemIcon>
              {translate("photoSharing:english")}
            </ListItemText>
            <ListItemIcon
              sx={{ visibility: language === "en" ? "visible" : "hidden" }}
            >
              <Check color="success" />
            </ListItemIcon>
          </MenuItem>
        </MenuList>
        
      </Menu>
      <UserUpdateInfor open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
export default UserMenu;
