// import AlertMessage from "@components/layout/AlertMessage";

import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  functionAlert,
  loadUser,
  saveAuthToken,
} from "../../../common/functions";
import fetchModel from "../../../lib/fetchModelData";
const LoginForm = () => {
  //Context
  //   const { loginUser } = useContext(AuthContext);
  //Navigate
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Local state
  // const [type, setType] = useState("password");

  const [alert, setAlert] = useState(null);

  // const [loginForm, setLoginForm] = useState({
  //   username: "",
  //   password: "",
  // });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (event) => {
    try {
      const res = await fetchModel(
        "/admin/login",
        "post",
        JSON.stringify(event)
      );

      if (!res.success) {
        setAlert({ type: "danger", msg: res.msg });
      } else {
        saveAuthToken(res?.token);
        setAlert(null);
        await loadUser(dispatch);
        navigate("/").then(() =>
          functionAlert("Thông báo", "Login thành công!")
        );
      }
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  };

  return (
    <Stack
      spacing={2}
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      flex={1}
      flexDirection={"column"}
    >
      <TextField
        // variant="filled"
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        // autoComplete="username"
        autoFocus
        {...register("username", { required: true })}
      />
      <TextField
        // variant="filled"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        // autoComplete="current-password"
        {...register("password", { required: true })}
      />
      {alert && (
        <Alert variant="outlined" severity="error">
          {alert.msg}
        </Alert>
      )}
      <Typography>
        Don't have an account?
        <Button
          id="goToRegisterButton"
          onClick={() => {
            navigate("/register");
          }}
          sx={{
            ml: "4px",
            p: "10px 12px",
          }}
        >
          Register
        </Button>
      </Typography>
      <Button variant="contained" type="submit">
        Login
      </Button>
      {/* <p className="text-success">{newPost}</p> */}
    </Stack>
  );
};

export default LoginForm;
