import { Grid } from "@mui/material";
import ItemTrong from "../../../lib/notThing/ItemTrong";
import { translate } from "../../../utils/i18n/translate";
import ItemPhoto from "./ItemPhoto";

const BasicMode = (props) => {
  const { userModel, userInfo, isComment } = props;
  return userModel?.length ? (
    <Grid container spacing={2}>
        {[...userModel]?.reverse()?.map((item, index) => (
          <ItemPhoto
            item={item}
            userInfo={userInfo}
            key={index}
            isComment={isComment}
          />
        ))}
    </Grid>
  ) : (
    <ItemTrong content={translate("photoSharing:noPhoto")} />
  );
};

export default BasicMode;
