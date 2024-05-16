import {
  Box,
  Grid,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import UserList from "../../UserList";

import { AddPhotoAlternate } from "@mui/icons-material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { file2Base64 } from "../../../common/functions";
import fetchFile from "../../../lib/fetchFile";
import { translate } from "../../../utils/i18n/translate";
import { socketComment } from "../../../utils/socketComment";
import "../styles.css";
import PostPhotoDialog from "./PostPhotoDialog";

const HomePage = (props) => {
  const { isHaveUserList } = props;
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { pathname } = useLocation();
  const arrPath = pathname?.split("/");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    file2Base64(event.target.files[0]).then((base64) => {
      console.log("🚀 ~ file2Base64 ~ base64:", base64)
      setUploaded(base64);
    });
  };
  const onClosePostFile = () => {
    setSelectedFile(null);
    setUploaded(null);
    setOpen(false);
  };
  const handleSubmit = async () => {
    try {
      // Gửi yêu cầu POST với selectedFile
      if (selectedFile) {
        setLoading(true);
        const formData = new FormData();
        formData.append("picture", selectedFile);
        const res = await fetchFile(
          "/api/photosOfUser/uploadphoto",
          "post",
          formData
        );
        console.log("🚀 ~ handleSubmit ~ res:", res);
        if (res.success) {
          setError(null);
          onClosePostFile();
          navigate(`/photos/${user._id}`);
          socketComment.emit("sendComment");
        } else {
          setError(res);
        }
        setLoading(false);
      } else {
        setError({ msg: translate("photoSharing:chooseFileToUpload") });
      }
    } catch (error) {
      setLoading(false);
      setSelectedFile(null);
      setError({ msg: error });
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  };

  const actions = [
    {
      icon: <AddPhotoAlternate />,
      name: `${translate("photoSharing:postYourPhoto")}`,
      onClick: () => setOpen(() => true),
    },
    // { icon: <Save />, name: "Save" },
    // { icon: <Print />, name: "Print" },
    // { icon: <Share />, name: "Share" },
  ];
  return (
    <Grid container mt={10}>
      {isHaveUserList && (
        <Grid item sm={2}>
          <Box
            sx={{
              maxHeight: 3 / 4,
              position: "fixed",
              width: 1 / 6,
              "&::-webkit-scrollbar": {
                display: "none",
              },
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            }}
            bgcolor={"white"}
            overflow={"auto"}
          >
            <UserList />
          </Box>
        </Grid>
      )}

      <Grid item sm={isHaveUserList ? 10 : 12}>
        <Box
          sx={{
            height: "100%",
            p: 2,
            mx: 2,
            borderRadius: 2,
            bgcolor: "white",
          }}
        >
          <Outlet />
        </Box>
      </Grid>
      {arrPath[1] != "me" && (
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "fixed", bottom: 16, left: 16 }}
          icon={<SpeedDialIcon />}
        >
          {actions?.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.onClick}
            />
          ))}
        </SpeedDial>
      )}
      <PostPhotoDialog
        uploaded={uploaded}
        open={open}
        onClose={onClosePostFile}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </Grid>
  );
};
export default HomePage;
