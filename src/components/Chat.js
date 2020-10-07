import React from "react";

// COMPONENTS
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInfo from "./ChatInfo";
import ChatWriteMessage from "./ChatWriteMessage";

// MATERIAL-UI
import Divider from "@material-ui/core/Divider";

// CSS
import "../css/chat.css";

function Chat() {
  return (
    <div className="chat">
      <ChatHeader />
      <div className="chat__messagesWrapper">
        <div className="chat__conversation">
          <ChatMessages />
          <Divider />
          <ChatWriteMessage />
        </div>
        <ChatInfo />
      </div>
    </div>
  );
}

export default Chat;
