import { Box } from "@mui/material";

const ItemTrong = ({ content }) => {
  return (
    <Box
      minWidth={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {content ? content : "Không có dữ liệu"}
    </Box>
  );
};
export default ItemTrong;
