import { Stack, TextField, Typography } from "@mui/material";

const DoubleTextField = (props) => {
  const { register, dataFirst, dataSecond } = props;
  const firstValue = dataFirst?.value;
  const secondValue = dataSecond?.value;
  return (
    <Stack spacing={2} direction="row" alignItems={"center"}>
      <TextField
        required={dataFirst?.required}
        margin="normal"
        fullWidth
        name={firstValue}
        label={dataFirst?.label}
        id={firstValue}
        type={dataFirst?.type ? dataFirst?.type : "text"}
        {...register(firstValue, { required: dataFirst?.required })}
      />
      <Typography>-</Typography>
      <TextField
        required={dataFirst?.required}
        margin="normal"
        fullWidth
        name={secondValue}
        label={dataSecond?.label}
        id={secondValue}
        type={dataSecond?.type ? dataSecond?.type : "text"}
        {...register(secondValue, { required: dataSecond?.required })}
      />
    </Stack>
  );
};
export default DoubleTextField;
