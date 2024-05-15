import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Input,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import UserList from "../../UserList";

import { AddPhotoAlternate } from "@mui/icons-material";
import { useState } from "react";
import { useSelector } from "react-redux";
import fetchFile from "../../../lib/fetchFile";
import { translate } from "../../../utils/i18n/translate";
import { socketComment } from "../../../utils/socketComment";
import "../styles.css";

const HomePage = (props) => {
  const { isHaveUserList } = props;
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      // Gửi yêu cầu POST với selectedFile
      const formData = new FormData();
      formData.append("picture", selectedFile);
      const res = await fetchFile(
        "/api/photosOfUser/uploadphoto",
        "post",
        formData
      );
      console.log("🚀 ~ handleSubmit ~ res:", res);
      if (res.success) {
        setOpen(false);
        navigate(`/photos/${user._id}`);
        socketComment.emit("sendComment");
      }
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      setOpen(false);
    }
  };

  const actions = [
    {
      icon: <AddPhotoAlternate onClick={() => setOpen(true)} />,
      name: `${translate("photoSharing:postYourPhoto")}`,
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

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 16, left: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{translate("photoSharing:postYourPhoto")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {translate("photoSharing:selectAImageToUpload")}
          </DialogContentText>
          <Input
            required
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <DialogActions>
            <Button onClick={handleSubmit}>
              {translate("photoSharing:upload")}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};
export default HomePage;
