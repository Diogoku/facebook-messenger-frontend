import React from "react";

// REACT-REDUX
import { useSelector } from "react-redux";

// MATERIAL-UI
import Avatar from "@material-ui/core/Avatar";

// MATERIAL-UI ICONS
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import NotificationsIcon from "@material-ui/icons/Notifications";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import BlockIcon from "@material-ui/icons/Block";
import WarningIcon from "@material-ui/icons/Warning";

// COMPONENTS
import ChatInfoList from "./ChatInfoList";

// CSS
import "../css/chatInfo.css";

function ChatInfo() {
  const currentConversation = useSelector((state) => state.messageReducer);

  const listItems = [
    {
      title: "More actions",
      actions: [
        {
          text: "Search in conversation",
          icon: <SearchIcon className="listItemIcon" />,
        },
        { text: "Edit nicknames", icon: <EditIcon className="listItemIcon" /> },
        {
          text: "Change theme",
          icon: <RadioButtonCheckedIcon className="listItemIcon blueIcon" />,
        },
        {
          text: "Change emoji",
          icon: <ThumbUpIcon className="listItemIcon blueIcon" />,
        },
      ],
    },
    {
      title: "Privacy and support",
      actions: [
        {
          text: "Notifications",
          icon: <NotificationsIcon className="listItemIcon" />,
        },
        {
          text: "Ignore messages",
          icon: <VisibilityOffIcon className="listItemIcon" />,
        },
        {
          text: "Block messages",
          icon: <BlockIcon className="listItemIcon" />,
        },
        {
          text: "An error has occurred",
          icon: <WarningIcon className="listItemIcon" />,
        },
      ],
    },
    {
      title: "Shared files",
      actions: [],
    },
    {
      title: "Shared photos",
      actions: [],
    },
  ];

  if (currentConversation.chatId) {
    return (
      <div className="chatInfo">
        <div className="chatInfo__top">
          <Avatar alt="unknow" className="chatInfo__avatar" />
          <h4>{currentConversation.friendName}</h4>
        </div>
        <div className="chatInfo__lists">
          {listItems.map((list, index) => (
            <ChatInfoList
              key={index}
              title={list.title}
              actions={list.actions}
            />
          ))}
        </div>
      </div>
    );
  } else return null;
}

export default ChatInfo;
