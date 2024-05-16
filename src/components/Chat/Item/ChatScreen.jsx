import {
  ChatContainer,
  ConversationHeader,
  Message,
  MessageInput,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import moment from "moment";
import React, { useEffect, useState } from "react";
import fetchModel from "../../../lib/fetchModelData";
import { translate } from "../../../utils/i18n/translate";

function ChatScreen({ socket, userId, listUser, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  console.log("🚀 ~ ChatScreen ~ currentMessage:", currentMessage);
  const [messageList, setMessageList] = useState([]);
  let userChatArray = room.split("-");
  let userIdChatWithMe = userChatArray.filter((i) => i !== userId)[0];
  let userChatWithMe = listUser?.filter((i) => i._id === userIdChatWithMe)[0];
  let username = listUser?.filter((i) => i._id === userId)[0];
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room_id: room,
        sender_id: username._id,
        message: currentMessage,
        create_at: Date.now(),
      };
      console.log("🚀 ~ sendMessage ~ messageData:", messageData);

      socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  const getData = async () => {
    try {
      const res = await fetchModel(`/api/messageOfUser/${room}`);
      if (res?.success) setMessageList(res?.data);
    } catch (error) {
      console.log("🚀 ~ getData ~ error:", error);
    }
  };
  useEffect(() => {
    getData();
  }, [room]);
  useEffect(() => {
    socket.on("receive_message", (data) => {
      socket.emit("is_receive");
      console.log("🚀 ~ socket.on ~ data:", data);
      setMessageList((list) => {
        if (!list.find((i) => Object.is(i, data))) return [...list, data];
        else return [...list];
      });
    });
  }, [socket]);

  return (
    <ChatContainer>
      <ConversationHeader>
        <ConversationHeader.Content
          userName={`${userChatWithMe?.first_name} ${userChatWithMe?.last_name}`}
        />
      </ConversationHeader>
      <MessageList>
        {messageList?.map((messageContent, index) => {
          const isFirst =
            index === 0 ||
            messageList?.[index]?.sender_id !=
              messageList?.[index - 1]?.sender_id;
          const isLast =
            index === messageList?.length - 1 ||
            messageList?.[index]?.sender_id !=
              messageList?.[index + 1]?.sender_id;
          const isSingle = isFirst && isLast;
          const displayName = listUser.filter(
            (i) => i._id === messageContent.sender_id
          )[0];

          const position = isSingle
            ? "single"
            : isFirst
            ? "first"
            : isLast
            ? "last"
            : "normal";
          return username._id === displayName._id ? (
            <Message
              model={{
                message: messageContent?.message,
                sentTime: messageContent?.create_at,
                position: position,
              }}
              children={
                <Message.Header
                  sender={displayName.first_name}
                  sentTime={moment(messageContent?.create_at).format(
                    "hh:mm A DD/MM/YYYY"
                  )}
                />
              }
            />
          ) : (
            <Message
              model={{
                direction: "incoming",
                message: messageContent?.message,
                sentTime: messageContent?.create_at,
                sender: displayName?.first_name,
                position: position,
              }}
              children={
                <Message.Header
                  sender={displayName?.first_name}
                  sentTime={moment(messageContent?.create_at).format(
                    "hh:mm A DD/MM/YYYY"
                  )}
                />
              }
            />
          );
        })}
      </MessageList>
      <MessageInput
        attachButton={false}
        placeholder={translate("photoSharing:typeMessageHere")}
        onChange={(event) => setCurrentMessage(event)}
        onSend={sendMessage}
      />
    </ChatContainer>
  );
}

export default ChatScreen;
