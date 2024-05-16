import { CloudUpload } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import VisuallyHiddenInput from "../../../lib/input/VisuallyHiddenInput";
import { translate } from "../../../utils/i18n/translate";

const PostPhotoDialog = (props) => {
  const {
    open,
    onClose,
    uploaded,
    handleFileChange,
    handleSubmit,
    loading,
    error,
  } = props;

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{translate("photoSharing:postYourPhoto")}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        {uploaded && (
          <DialogContentText>
            {translate("photoSharing:previewImage")}
          </DialogContentText>
        )}
        {uploaded && <img src={uploaded} />}
        <DialogContentText>
          {translate("photoSharing:selectAImageToUpload")}
        </DialogContentText>
        <Button
          component="label"
          role={undefined}
          variant="outlined"
          startIcon={<CloudUpload />}
        >
          {translate("photoSharing:addYourPhoto")}

          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>
        <DialogContentText mt={2}>
          {error && <Alert severity="error">{error.msg}</Alert>}
        </DialogContentText>
        
      </DialogContent>
      <DialogActions>
          <Button onClick={onClose}>{translate("photoSharing:cancel")}</Button>
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={handleSubmit}
          >
            {translate("photoSharing:upload")}
          </LoadingButton>
        </DialogActions>
    </Dialog>
  );
};
export default PostPhotoDialog;
