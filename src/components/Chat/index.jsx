import React, { useEffect, useState } from "react";

import {
  ChatContainer,
  ConversationList,
  MainContainer,
  MessageList,
  Search,
  Sidebar,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useDispatch, useSelector } from "react-redux";
import fetchModel from "../../lib/fetchModelData";
import { translate } from "../../utils/i18n/translate";
import { socketChat } from "../../utils/socketComment";
import ChatScreen from "./Item/ChatScreen";
import ItemConversation from "./Item/ItemConversation";
import "./styles.css";
const Chat = () => {
  const [room, setRoom] = useState("");
  const [listUser, setListUser] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [onlineUsers, setOnlineUser] = useState([]);
  // const { onlineUsers } = useSelector((state) => state.online);
  console.log("🚀 ~ Chat ~ onlineUsers:", onlineUsers);

  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const getData = async () => {
    try {
      const res = await fetchModel("/api/user/list");
      if (res?.success) setListUser(res?.data);
    } catch (error) {
      console.log("🚀 ~ getData ~ error:", error);
    }
  };
  const getOnlineData = async () => {
    try {
      const resOnline = await fetchModel("/api/onlineUser/all");
      if (resOnline?.success)
        setOnlineUser(resOnline?.data?.map((i) => i.user_id));
    } catch (error) {
      console.log("🚀 ~ getData ~ error:", error);
    }
  };
  useEffect(() => {
    getData();
    getOnlineData();
  }, []);

  useEffect(() => {
    socketChat.on("user-status", () => getOnlineData());
  }, [socketChat]);

  // useEffect(() => {
  //   socketChat.on("user-status", (data) => {
  //     if (data.status === "online") {
  //       setOnlineUser((e) => {
  //         if (onlineUsers?.find((i) => i === data?.userId)) return e;
  //         return [...e, data?.userId];
  //       }); // add user to online list
  //     }
  //     if (data.status === "offline") {
  //       setOnlineUser((e) => e?.filter((i) => i !== data?.userId)); // remove user from online list
  //     }
  //     console.log(`User ${data.userId} is ${data.status}`);
  //   });
  // }, [socketChat, onlineUsers]);
  const joinRoom = (otherUser) => {
    console.log("🚀 ~ joinRoom ~ otherUser:", otherUser);
    if (otherUser !== "" && generationIdRoom(user._id, otherUser) !== "") {
      setRoom(generationIdRoom(user._id, otherUser));
      socketChat.emit("join_room", generationIdRoom(user._id, otherUser));
      setShowChat(true);
    }
  };
  const generationIdRoom = (user1, user2) => {
    //sort trước rồi mới trả về
    if (user1 && user2) {
      const roomId = [user1, user2]
        .sort((a, b) => a.toString().localeCompare(b.toString()))
        .join("-");
      return roomId; //id phòng chat
    }
    return "";
  };
  const refactorListUser = listUser?.filter(
    (i) =>
      i?.first_name?.toLowerCase()?.includes(search?.toLowerCase()) ||
      i?.last_name?.toLowerCase()?.includes(search?.toLowerCase())
  );

  return (
    <MainContainer style={{ height: "80vh" }}>
      <Sidebar position="left">
        <Search placeholder={`${translate('photoSharing:search')}...`} onChange={setSearch} />
        <ConversationList>
          {refactorListUser
            ?.filter((i) => i._id != user._id)
            ?.map((item, index) => {
              return (
                <ItemConversation
                  item={item}
                  joinRoom={joinRoom}
                  user={user}
                  generationIdRoom={generationIdRoom}
                  listUser={listUser}
                  isOnline={onlineUsers?.find((i) => i === item._id)}
                />
              );
            })}
        </ConversationList>
      </Sidebar>
      {!showChat ? (
        <ChatContainer>
          <MessageList>
            <MessageList.Content
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
                textAlign: "center",
                fontSize: "1.2em",
              }}
            >
              {translate("photoSharing:welcomeToChatBox", {
                name: `${user?.first_name} ${user?.last_name}`,
              })}
            </MessageList.Content>
          </MessageList>
        </ChatContainer>
      ) : (
        <ChatScreen
          socket={socketChat}
          userId={user._id}
          listUser={listUser}
          room={room}
        />
      )}
    </MainContainer>
  );
};
export default Chat;
