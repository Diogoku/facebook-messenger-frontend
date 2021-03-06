import React, { useState, useEffect } from "react";

// REACT-REDUX
import { useSelector, useDispatch } from "react-redux";
import {
  getConversation,
  setFriendNameChat,
} from "../actions/message/messageActionsCreator";

// AXIOS
import axios from "../axios";

// MATERIAL-UI
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";

// CSS
import "../css/sideBarChatMessage.css";

function SideBarChatMessages({ filter }) {
  const currentUser = useSelector((state) => state.userReducer);
  const [friends, setFriends] = useState([]); // friends with full data (name, facebookId, chatId)

  const dispatch = useDispatch(); // dispatcher

  useEffect(() => {
    const fetchUserPublicData = async (friend) => {
      const { data } = await axios.get(`publicUsers/${friend.facebookId}`);
      setFriends([...friends, { ...{ name: data.name }, ...friend }]);
    };

    currentUser.user.friends.forEach((friend) => {
      fetchUserPublicData(friend);
    });
  }, [currentUser.user.friends]);

  // get friend conversation
  const getFriendConversation = (chatId, friendName) => {
    dispatch(getConversation(chatId));
    dispatch(setFriendNameChat(friendName));
  };

  return (
    <div className="sideBarChatMessages">
      <h4>Friends</h4>
      <List
        component="nav"
        aria-labelledby="messenger-users"
        subheader={
          <ListSubheader component="div" id="messenger-users"></ListSubheader>
        }
      >
        {friends
          .filter((friend) => friend.name.startsWith(filter))
          .map((friend) => (
            <ListItem
              button
              key={friend.facebookId}
              onClick={() => getFriendConversation(friend.chatId, friend.name)}
            >
              <ListItemAvatar>
                <Avatar alt={`User ${friend.name} perfil photo`} />
              </ListItemAvatar>
              {friend.name}
            </ListItem>
          ))}
      </List>
    </div>
  );
}

export default SideBarChatMessages;
