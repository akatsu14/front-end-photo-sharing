import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Stack,
    TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import fetchModel from "../../../lib/fetchModelData";
import { setUser } from "../../../redux/actions/authAction";
import { translate } from "../../../utils/i18n/translate";
import DoubleTextField from "../../Auth/RegisterForm/Item/DoubleTextField";

const UserUpdateInfor = (props) => {
  const { open, onClose } = props;
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      location: user?.location,
      description: user?.description,
      occupation: user?.occupation,
    },
  });

  const updateInfor = async (event) => {
    try {
      const res = await fetchModel("/api/user", "patch", JSON.stringify(event));
      if (res.success) {
        dispatch(setUser({ user: res.data }));
        onClose();
      }
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText>
          {translate("photoSharing:updateInformation")}
        </DialogContentText>
      </DialogContent>
      <DialogContent>
        <form onSubmit={handleSubmit(updateInfor)}>
          <Stack spacing={2}>
            <DoubleTextField
              register={register}
              dataFirst={{
                value: "first_name",
                label: translate("photoSharing:firstName"),
                required: true,
              }}
              dataSecond={{
                value: "last_name",
                label: translate("photoSharing:lastName"),
                required: true,
              }}
            />
            <DoubleTextField
              register={register}
              dataFirst={{
                label: translate("photoSharing:location"),
                value: "location",
              }}
              dataSecond={{
                label: translate("photoSharing:occupation"),
                value: "occupation",
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="description"
              label={translate("photoSharing:description")}
              id="description"
              {...register("description")}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button>{translate("photoSharing:update")}</Button>
      </DialogActions>
    </Dialog>
  );
};
export default UserUpdateInfor;
