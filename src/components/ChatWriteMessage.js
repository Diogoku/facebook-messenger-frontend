import React, { useState } from "react";

// REACT-REDUX
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../actions/message/messageActionsCreator"; // ACTIONS

// MATERIAL UI
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

// MATERIAL-UI ICONS
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import SentimentSatisfiedTwoToneIcon from "@material-ui/icons/SentimentSatisfiedTwoTone";
import MicNoneOutlinedIcon from "@material-ui/icons/MicNoneOutlined";
import SportsEsportsOutlinedIcon from "@material-ui/icons/SportsEsportsOutlined";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import ThumbUp from "@material-ui/icons/ThumbUp";
import SendIcon from "@material-ui/icons/Send";

// CSS
import "../css/chatWriteMessage.css";

function ChatWriteMessage() {
  const [message, setMessage] = useState("");
  const currentUser = useSelector((state) => state.userReducer);
  const currentConversation = useSelector((state) => state.messageReducer);
  const dispatch = useDispatch(); // dispatcher

  const sendMessageFunc = async (e) => {
    e.preventDefault();
    if (message.length > 0 && currentConversation.chatId) {
      await dispatch(
        sendMessage(
          currentConversation.chatId,
          currentUser.user.facebookId,
          message
        )
      );
      setMessage("");
    }
  };

  return (
    <div className="chatWriteMessage">
      <form
        className="chatWriteMessage__form"
        onSubmit={sendMessageFunc}
        name="sendMessaage__form"
      >
        <TextField
          id="outlined-basic"
          label="Type a mesage..."
          variant="outlined"
          size="small"
          multiline
          rows={1.5}
          rowsMax={1.5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Tooltip title="Send Message" aria-label="Send Message">
          <Button size="small" type="submit" onClick={sendMessageFunc}>
            <SendIcon />
          </Button>
        </Tooltip>

        <Tooltip title="Like" aria-label="Like">
          <Button size="small">
            <ThumbUp />
          </Button>
        </Tooltip>
      </form>
      <div className="chatWriteMessage__icons">
        <Tooltip title="More Actions" aria-label="More Actions">
          <Button size="small">
            <AddCircleIcon />
          </Button>
        </Tooltip>
        <Tooltip
          title="Attach photo or video"
          aria-label="Attach photo or video"
        >
          <Button size="small">
            <PhotoLibraryIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Choose an emogi" aria-label="Choose an emogi">
          <Button size="small">
            <SentimentSatisfiedTwoToneIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Mic" aria-label="Mic">
          <Button size="small">
            <MicNoneOutlinedIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Money" aria-label="Money">
          <Button size="small">
            <MonetizationOnOutlinedIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Games" aria-label="Games">
          <Button size="small">
            <SportsEsportsOutlinedIcon />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}

export default ChatWriteMessage;
