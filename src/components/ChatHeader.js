import React from "react";

// REACT-REDUX
import { useSelector } from "react-redux";

// MATERIAL-UI
import Avatar from "@material-ui/core/Avatar";
import PhoneIcon from "@material-ui/icons/Phone";
import VideocamIcon from "@material-ui/icons/Videocam";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

// CSS
import "../css/chatHeader.css";

function ChatHeader() {
  const currentUser = useSelector((state) => state.userReducer);

  return (
    <div className="chatHeader">
      <Avatar alt={currentUser.user.name} src={currentUser.user.photoUrl} />
      <h4>{currentUser.user.name}</h4>
      <Tooltip title="Start a call" aria-label="Start a call">
        <Button size="small">
          <PhoneIcon />
        </Button>
      </Tooltip>
      <Tooltip title="Start a video call" aria-label="Start a call">
        <Button size="small">
          <VideocamIcon />
        </Button>
      </Tooltip>
      <Tooltip title="Chat info" aria-label="Chat info">
        <Button size="small">
          <InfoIcon />
        </Button>
      </Tooltip>
    </div>
  );
}

export default ChatHeader;
