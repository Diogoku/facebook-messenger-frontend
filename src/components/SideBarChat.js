import React, { useState, useEffect } from "react";

// REACT-REDUX
import { useSelector } from "react-redux";

// AXIOS
import axios from "../axios";

// COMPONENTS
import MakeNewFriends from "./MakeNewFriends";
import RequestsSent from "./RequestsSent";
import RequestsReceived from "./RequestsReceived";
import SideBarChatMessages from "./SideBarChatMessages";

// MATERIAL-UI
import Tooltip from "@material-ui/core/Tooltip";
import InputAdornment from "@material-ui/core/inputAdornment";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

// MATERIAL-UI ICONS
import SettingsIcon from "@material-ui/icons/Settings";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import SearchIcon from "@material-ui/icons/Search";

// CSS
import "../css/sideBarChat.css";

function SideBarChat() {
  const currentUser = useSelector((state) => state.userReducer);

  // LIST
  const [addNewUserList, setAddNewUserList] = useState([]);

  useEffect(() => {
    axios
      .get(`/publicUsers`)
      .then((users) => {
        users.data.forEach((user) => {
          if (
            user.facebookId !== currentUser.user.facebookId &&
            !currentUser.user.friendsRequestsReceived.includes(
              user.facebookId
            ) &&
            !currentUser.user.friendsRequestsSent.includes(user.facebookId) &&
            !currentUser.user.blockedList.includes(user.facebookId) &&
            !currentUser.user.blockedByList.includes(user.facebookId) &&
            !currentUser.user.friends.some(
              (friend) => friend.facebookId === user.facebookId
            )
          ) {
            setAddNewUserList([...addNewUserList, user.facebookId]);
          }
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="sideBarChat">
      <div className="sideBarChat__top">
        <h1>Menu</h1>
        <div className="sideBarChat__topIcons">
          <Tooltip
            title="Settings, help and more"
            aria-label="Settings, help and more"
            arrow
          >
            <IconButton size="small">
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Create new room" aria-label="Create new room" arrow>
            <IconButton size="small">
              <VideoCallIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="New message" aria-label="New message" arrow>
            <IconButton size="small">
              <OpenInNewIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <Divider />

      <MakeNewFriends usersListId={addNewUserList} />

      <RequestsSent usersListId={currentUser.user.friendsRequestsSent} />

      <RequestsReceived
        usersListId={currentUser.user.friendsRequestsReceived}
      />

      <Divider />

      <div className="sideBarChat__form">
        <form>
          <TextField
            id="SearchFriendForm"
            label="Search friends on Messenger"
            variant="filled"
            color="primary"
            name="searchFriendForm"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton size="small">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>

        <SideBarChatMessages />
      </div>
    </div>
  );
}

export default SideBarChat;
