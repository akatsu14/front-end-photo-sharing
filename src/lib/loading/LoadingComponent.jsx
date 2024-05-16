import { Box, CircularProgress } from "@mui/material";

const LoadingComponent = (props) => {
  const { loading = true } = props;
  return loading ? (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <CircularProgress />
    </Box>
  ) : (
    <></>
  );
};
export default LoadingComponent;
