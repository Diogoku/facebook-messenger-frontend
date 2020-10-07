import React from "react";

// REACT-REDUX
import { useSelector } from "react-redux";

// MATERIAL-UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

// CSS
import "../css/chatMessages.css";

function ChatMessages() {
  const currentUser = useSelector((state) => state.userReducer);
  const currentConversation = useSelector((state) => state.messageReducer);

  return (
    <div className="chatMessages">
      {currentConversation.conversation.map((message, index) => {
        return (
          <Card
            key={index}
            className={
              currentUser.user.facebookId == message.from
                ? "currentUserMessage"
                : "otherUserMessage"
            }
          >
            <CardActionArea>
              <CardContent>
                <p>{message.text}</p>
                <p className="message__date">{message.createdAt}</p>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </div>
  );
}

export default ChatMessages;
