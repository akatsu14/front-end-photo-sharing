import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import fetchModel from "../../../lib/fetchModelData";
import { setUser } from "../../../redux/actions/authAction";
import { translate } from "../../../utils/i18n/translate";
import DoubleTextField from "../../Auth/RegisterForm/Item/DoubleTextField";

const UserUpdateInfor = (props) => {
  const { open, onClose } = props;
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      location: "",
      description: "",
      occupation: "",
    },
    values: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      location: user?.location,
      description: user?.description,
      occupation: user?.occupation,
    },
  });

  const updateInfor = async (event) => {
    try {
      console.log("update");
      setLoading(true);
      const res = await fetchModel(
        "/api/user/me",
        "put",
        JSON.stringify(event)
      );
      if (res.success) {
        dispatch(setUser({ user: res?.data }));
        onClose();
        navigate(`/users/${user._id}`);
      }
      setLoading(false);
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      setLoading(false);
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
        <FormControl>
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
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{translate("photoSharing:cancel")}</Button>
        <LoadingButton
          onClick={handleSubmit(updateInfor)}
          loading={loading}
          variant="contained"
        >
          {translate("photoSharing:update")}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
export default UserUpdateInfor;
