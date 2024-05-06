import { Grid } from "@mui/material";
import ItemPhoto from "./ItemPhoto";

const BasicMode = (props) => {
  const { userModel, userInfo, isComment } = props;
  return (
    <Grid container spacing={2} columns={16}>
      {userModel?.map((item, index) => (
        <ItemPhoto
          item={item}
          userInfo={userInfo}
          key={index}
          isComment={isComment}
        />
      ))}
    </Grid>
  );
};

export default BasicMode;
