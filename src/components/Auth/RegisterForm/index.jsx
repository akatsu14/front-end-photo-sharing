// import AlertMessage from "@components/layout/AlertMessage";

import {
  Alert,
  Button,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUser, saveAuthToken } from "../../../common/functions";
import fetchModel from "../../../lib/fetchModelData";
import { translate } from "../../../utils/i18n/translate";
import DoubleTextField from "./Item/DoubleTextField";
const RegisterForm = () => {
  //Context
  //   const { loginUser } = useContext(AuthContext);
  //Navigate
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Local state
  // const [type, setType] = useState("password");

  const [alert, setAlert] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      first_name: "",
      last_name: "",
      location: "",
      description: "",
      occupation: "",
    },
  });

  const onSubmit = async (event) => {
    try {
      const res = await fetchModel(
        "/admin/register",
        "post",
        JSON.stringify(event)
      );

      if (!res.success) {
        setAlert({ type: "danger", msg: res.msg });
      } else {
        saveAuthToken(res?.token);
        setAlert(null);
        navigate("/");
      }
      await loadUser(dispatch);
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  };

  return (
    <Stack
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      flex={1}
      flexDirection={"column"}
    >
      <List sx={{ overflow: "auto" }}>
        <Stack spacing={2}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="username"
            label="Username"
            id="username"
            {...register("username", { required: true })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            {...register("password", { required: true })}
          />

          <DoubleTextField
            register={register}
            dataFirst={{
              value: "first_name",
              label: "First name",
              required: true,
            }}
            dataSecond={{
              value: "last_name",
              label: "Last name",
              required: true,
            }}
          />
          <DoubleTextField
            register={register}
            dataFirst={{ label: "Location", value: "location" }}
            dataSecond={{ label: "Occupation", value: "occupation" }}
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
      </List>
      {alert && (
        <Alert variant="outlined" severity="error">
          {alert.msg}
        </Alert>
      )}
      <Typography>
        Already have an account?
        <Button
          id="goToLoginButton"
          onClick={() => {
            navigate("/login");
          }}
          sx={{
            ml: "4px",
            p: "10px 12px",
          }}
        >
          Login
        </Button>
      </Typography>
      <Button variant="contained" type="submit">
        Register
      </Button>
    </Stack>
  );
};

export default RegisterForm;
