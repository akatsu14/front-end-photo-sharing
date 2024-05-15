import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { translate } from "../../../utils/i18n/translate";

const InitialPage = () => {
  // const [user, setUser] = useState();
  const { user } = useSelector((state) => state.auth);
  // const getData = async () => {
  //   const res = await fetchModel("/api/user/me");
  //   console.log("🚀 ~ getData ~ res:", res)
  //   if (res?.success) setUser(res?.data);
  // };
  // useEffect(() => {
  //   getData();
  // }, []);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography>
        {translate('photoSharing:hi')}, <b>{user?.first_name}</b>!
      </Typography>
    </Box>
  );
};
export default InitialPage;
