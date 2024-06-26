import { ArrowRightAlt } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const Welcome = (props) => {
  const navigate = useNavigate();
  return (
    <Grid item flex={1}>
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        height={"100vh"}
        flexDirection={"column"}
      >
        <CardMedia
          component="root"
          image={"../../images/bgDashBoard.png"}
          alt={`DashBoard intro`}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            height: "100%",
          }}
        >
          <Backdrop sx={{ zIndex: 1 }} open={true} />
          <Stack spacing={1} alignItems={"center"}>
            <Typography variant="h4" color={"wheat"} zIndex={2}>
              Find your inspiration
            </Typography>
            <Typography variant="h6" color={"wheat"} zIndex={2}>
              <b>Image sharing sites that are worth trying</b>
            </Typography>
            <Typography variant="h6" color={"wheat"} zIndex={2}>
              Join the creative community
            </Typography>
            <Button
              onClick={() => navigate("/login")}
              variant="contained"
              color="primary"
              sx={{ pr: 1.5, zIndex: 2 }}
            >
              Explore now
              <ArrowRightAlt sx={{ ml: 1 }} />
            </Button>
          </Stack>
        </CardMedia>
      </Box>
    </Grid>
  );
};
export default Welcome;
