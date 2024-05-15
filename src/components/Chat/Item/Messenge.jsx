import { Avatar, Box, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import moment from "moment";
import React from "react";
import "./styles.css";

export const MessageLeft = (props) => {
  const message = props.message ? props.message : "no message";
  console.log("🚀 ~ MessageLeft ~ message:", message);
  const timestamp = props.timestamp ? props.timestamp : "";
  const photoURL = props.photoURL ? props.photoURL : "dummy.js";
  const displayName = props.displayName ? props.displayName : "名無しさん";
  return (
    <Box display={"flex"}>
      <Avatar
        alt={displayName}
        sx={(theme) => ({
          color: theme.palette.getContrastText(deepOrange[500]),
          backgroundColor: deepOrange[500],
          width: theme.spacing(4),
          height: theme.spacing(4),
        })}
        className={"orange"}
        src={photoURL}
      ></Avatar>
      <Box>
        <Box ml={2}>{displayName}</Box>
        <Box
          sx={{
            position: "relative",
            marginLeft: "20px",
            marginBottom: "10px",
            padding: "10px",
            backgroundColor: "#A8DDFD",
            width: "170px",
            textAlign: "left",
            breakInside:'auto',
            font: "400 .9em 'Open Sans', sans-serif",
            border: "1px solid #97C6E3",
            borderRadius: "10px",
            "&:after": {
              content: "''",
              position: "absolute",
              width: "0",
              height: "0",
              borderTop: "15px solid #A8DDFD",
              borderLeft: "15px solid transparent",
              borderRight: "15px solid transparent",
              top: "0",
              left: "-15px",
            },
            "&:before": {
              content: "''",
              position: "absolute",
              width: "0",
              height: "0",
              borderTop: "17px solid #97C6E3",
              borderLeft: "16px solid transparent",
              borderRight: "16px solid transparent",
              top: "-1px",
              left: "-17px",
            },
          }}
        >
          <Typography className="breakword" p={0} m={0}>
            {message}
          </Typography>
          <Box
            position={"absolute"}
            fontSize={".85em"}
            fontWeight={"300"}
            mt={"10px"}
            bottom="-3px"
            right="5px"
          >
            {moment(timestamp).format("hh:mm DD/MM/YY")}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export const MessageRight = (props) => {
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  console.log("🚀 ~ MessageRight ~ timestamp:", timestamp);
  return (
    <Box display={"flex"} justifyContent={"flex-end"}>
      <Box
        sx={{
          position: "relative",
          marginRight: "20px",
          marginBottom: "20px",
          padding: "10px",
          backgroundColor: "#f8e896",
          width: "60%",
          //height: "50px",
          textAlign: "left",
          font: "400 .9em 'Open Sans', sans-serif",
          border: "1px solid #dfd087",
          borderRadius: "10px",
          "&:after": {
            content: "''",
            position: "absolute",
            width: "0",
            height: "0",
            borderTop: "15px solid #f8e896",
            borderLeft: "15px solid transparent",
            borderRight: "15px solid transparent",
            top: "0",
            right: "-15px",
          },
          "&:before": {
            content: "''",
            position: "absolute",
            width: "0",
            height: "0",
            borderTop: "17px solid #dfd087",
            borderLeft: "16px solid transparent",
            borderRight: "16px solid transparent",
            top: "-1px",
            right: "-17px",
          },
        }}
      >
        <Typography className="breakword" p={0} m={0}>
          {message}
        </Typography>
        <Box
          position={"absolute"}
          fontSize={".85em"}
          fontWeight={"300"}
          mt={"10px"}
        >
          {moment(new Date(timestamp)).format("hh:mm DD/MM/YY")}
        </Box>
      </Box>
    </Box>
  );
};
