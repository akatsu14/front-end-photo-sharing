import { Avatar, Conversation } from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useEffect, useState } from "react";
import { convertTextToBase64 } from "../../../common/functions";
import fetchModel from "../../../lib/fetchModelData";
import { socketChat } from "../../../utils/socketComment";

const ItemConversation = (props) => {
  const { item, joinRoom, user, generationIdRoom, listUser, isOnline } = props;
  const [lastMessage, setLastMessage] = useState({});
  const [img, setImg] = useState("");
  console.log("🚀 ~ ItemConversation ~ img:", img)
  console.log("🚀 ~ ItemConversation ~ isOnline:", isOnline);
  const getLastMessage = async () => {
    try {
      const res = await fetchModel(
        `/api/messageOfUser/${generationIdRoom(user._id, item._id)}`
      );
      console.log("🚀 ~ getLastMessage ~ res:", res);

      if (res?.success) setLastMessage(res?.data[res?.data.length - 1]);
      const resImg = await convertTextToBase64(user?.first_name?.[0]);
      setImg(resImg);
    } catch (error) {
      console.log("🚀 ~ getData ~ error:", error);
    }
  };
  useEffect(() => {
    getLastMessage();
  }, []);
  useEffect(() => {
    socketChat.on("is_send", () => getLastMessage());
    // Lắng nghe trạng thái người dùng
  }, [socketChat]);

  return (
    <Conversation
      onClick={() => joinRoom(item?._id)}
      info={lastMessage ? lastMessage?.message : ""}
      lastSenderName={
        lastMessage
          ? lastMessage?.sender_id === user._id
            ? "You"
            : listUser?.filter((i) => i?._id === lastMessage?.sender_id)?.[0]
                ?.first_name
          : null
      }
      name={`${item?.first_name} ${item?.last_name}`}
    >
      <Avatar
        name={item?.first_name}
        src={img ? img : "../../../images/avatarDefault.png"}
        status={isOnline ? "available" : "invisible"}
      />
    </Conversation>
  );
};
export default ItemConversation;
