import React from "react";

// COMPONENTS
import SideBarChat from "./SideBarChat";
import Chat from "./Chat";

// CSS
import "../css/chatPage.css";

function ChatPage() {
  return (
    <div className="chatPage">
      <SideBarChat />
      <Chat />
    </div>
  );
}

export default ChatPage;
