import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ItemPhoto = (props) => {
  const { item, userInfo, isAdvance, isComment } = props;
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(isComment);
  console.log("ItemPhoto", item);
  const goToUser = (userId) => {
    console.log("userId", userId);
    navigate(`/users/${userId}`);
  };
  return (
    <Grid item xs={isAdvance ? 16 : 8} key={item?._id}>
      <Card variant="outlined" key={item?._id}>
        <CardHeader
          title={
            <Typography
              onClick={() => goToUser(item?.user_id)}
              color={"blue"}
              style={{ cursor: "pointer" }}
            >
              {`${userInfo?.first_name} ${userInfo?.last_name}`}
            </Typography>
          }
          subheader={moment(item?.date_time).format("hh:mm DD/MM/YYYY")}
          avatar={<Avatar>{userInfo?.first_name[0]}</Avatar>}
        />
        <CardMedia
          component="img"
          // loading={<Box>Loading...</Box>}
          image={`../../images/${item.file_name}`}
          alt={`${userInfo?.first_name} Post`}
        />
        <CardActions disableSpacing>
          <Typography variant="h5" aria-label="comments">
            Bình luận:
          </Typography>
          <ExpandMore
            expand={expanded}
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Divider />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {item?.comments?.length ? (
              item.comments?.map((items) => {
                return (
                  <div key={items?._id}>
                    <Typography
                      onClick={() => goToUser(items?.user?._id)}
                      style={{
                        display: "flex",
                        cursor: "pointer",
                        color: "blue",
                        margin: 0,
                        alignItems: "center",
                      }}
                    >
                      <Avatar style={{ marginRight: "12px" }}>
                        {items.user?.first_name[0]}
                      </Avatar>
                      {`${items.user?.first_name} ${items.user?.last_name}:`}
                    </Typography>
                    <Typography>{`${items?.comment}`}</Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      textAlign={"right"}
                    >
                      {moment(items?.date_time).format("hh:mm DD/MM/YYYY")}
                    </Typography>
                  </div>
                );
              })
            ) : (
              <Typography>Không có bình luận nào</Typography>
            )}
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default ItemPhoto;
