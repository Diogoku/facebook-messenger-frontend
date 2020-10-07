import React, { useState, useEffect } from "react";

// REACT-REDUX
import { useSelector, useDispatch } from "react-redux";
import {
  acceptFriendRequest,
  rejectFriendRequest,
} from "../actions/user/userActionsCreator"; // ACTIONS

// AXIOS
import axios from "../axios";

// MATERIAL-UI
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// MATERIAL-UI ICONS
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

// CSS
import "../css/requestsReceived.css";

function RequestsReceived({ usersListId }) {
  const [isOpen, setIsOpen] = useState(null);
  const [users, setUsers] = useState([]);

  const currentUser = useSelector((state) => state.userReducer);
  const dispatch = useDispatch(); // dispatcher

  // fetch user public data
  useEffect(() => {
    const fetchUserPublicData = async (userId) => {
      const { data } = await axios.get(`publicUsers/${userId}`);
      setUsers([...users, data]);
    };

    usersListId.map((userId) => {
      fetchUserPublicData(userId);
    });
  }, [usersListId, currentUser.user.friendsRequestSent]);

  // open menu
  const openMenu = (event) => {
    setIsOpen(event.currentTarget);
  };

  // close menu
  const closeMenu = () => {
    setIsOpen(null);
  };

  // accept friend request
  const acceptFriendRequestFunc = (currentUserId, acceptUserId) => {
    dispatch(acceptFriendRequest(currentUserId, acceptUserId));
  };

  // reject friend request
  const rejectFriendRequestFunc = (currentUserId, rejectUserId) => {
    dispatch(rejectFriendRequest(currentUserId, rejectUserId));
  };

  return (
    <div className="requestsReceived">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={openMenu}
      >
        Requests Received
      </Button>
      <Menu
        className="sideBarChat__menu"
        anchorEl={isOpen}
        keepMounted
        open={Boolean(isOpen)}
        onClose={closeMenu}
        PaperProps={{
          style: {
            maxHeight: 48 * 2.5,
          },
        }}
      >
        {users.map((user) => (
          <MenuItem key={user.facebookId} onClick={closeMenu}>
            <Avatar />
            <p>{user.name}</p>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              endIcon={<CheckIcon />}
              onClick={() =>
                acceptFriendRequestFunc(
                  currentUser.user.facebookId,
                  user.facebookId
                )
              }
            >
              Accept Request
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              endIcon={<CloseIcon />}
              onClick={() =>
                rejectFriendRequestFunc(
                  currentUser.user.facebookId,
                  user.facebookId
                )
              }
            >
              Reject Request
            </Button>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default RequestsReceived;
