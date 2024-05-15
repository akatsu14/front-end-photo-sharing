import {
  Avatar,
  ChatContainer,
  ConversationHeader,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { Clear, Send } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { MessageLeft, MessageRight } from "./Messenge";

function ChatScreen({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  console.log("🚀 ~ ChatScreen ~ currentMessage:", currentMessage);
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        displayName: username,
        message: currentMessage,
        timestamp: Date.now(),
      };
      console.log("🚀 ~ sendMessage ~ messageData:", messageData);

      socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => {
        if (!list.find((i) => Object.is(i, data))) return [...list, data];
        else return [...list];
      });
    });
  }, []);

  return true ? (
    <div style={{ position: "relative", height: "500px", width: "400px" }}>
      <MainContainer>
        <ChatContainer>
          <ConversationHeader>
            <Avatar
              name="Emily"
              src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
            />
            <ConversationHeader.Content
              // info="Active 10 mins ago"
              userName="Emily"
            />
            <MessageList>
              {messageList.map((messageContent, index) => {
                return username === messageContent.displayName ? (
                  <Message
                    model={{
                      message: messageContent?.message,
                      sentTime: messageContent?.timestamp,
                      position: "first",
                    }}
                    children={
                      <Message.Header
                        sender="Emily"
                        sentTime={moment(messageContent?.timestamp).format(
                          "hh:mm DD/MM/YYYY"
                        )}
                      />
                    }
                  />
                ) : (
                  <Message
                    model={{
                      direction: "incoming",
                      message: messageContent?.message,
                      sentTime: messageContent?.timestamp,
                      sender: messageContent.displayName,
                      position: "first",
                    }}
                    children={
                      <Message.Header
                        sender={messageContent.displayName}
                        sentTime={moment(messageContent?.timestamp).format(
                          "hh:mm DD/MM/YYYY"
                        )}
                      />
                    }
                  />
                );
              })}
            </MessageList>
          </ConversationHeader>
          <MessageInput
            placeholder="Type message here"
            onChange={(event) => setCurrentMessage(event)}
            onSend={sendMessage}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  ) : (
    <Box className="chat-window">
      <Card variant="outlined">
        <CardHeader
          sx={{ backgroundColor: "#263238" }}
          title={<Typography color={"white"}>Live Chat</Typography>}
          action={
            <IconButton sx={{ color: "white" }}>
              <Clear />
            </IconButton>
          }
        />
        <Divider />
        <CardActions disableSpacing>
          <Box width={"100%"} height="350px">
            <ScrollToBottom className="message-container">
              {messageList.map((messageContent) => {
                return username === messageContent.displayName ? (
                  <MessageRight
                    message={messageContent?.message}
                    timestamp={messageContent?.timestamp}
                  />
                ) : (
                  <MessageLeft
                    message={messageContent?.message}
                    timestamp={messageContent?.timestamp}
                    displayName={messageContent?.displayName}
                  />
                );
              })}
            </ScrollToBottom>
          </Box>
        </CardActions>
        <Divider />
        <CardActions disableSpacing>
          <InputBase
            multiline
            value={currentMessage}
            onChange={(event) => setCurrentMessage(event.target.value)}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Aa"
            inputProps={{ "aria-label": "add your comment" }}
          />
          <IconButton
            color="primary"
            sx={{
              p: "10px",
              "&:hover": {
                color: " #43a047",
              },
            }}
            aria-label="directions"
            onClick={sendMessage}
          >
            <Send />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
}

export default ChatScreen;
