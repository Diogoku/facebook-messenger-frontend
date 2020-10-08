import React, { useState, useEffect } from "react";

// REACT-REDUX
import { useSelector, useDispatch } from "react-redux";
import { cancelRequest } from "../actions/user/userActionsCreator"; // ACTIONS

// AXIOS
import axios from "../axios";

// MATERIAL-UI
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// MATERIAL-UI ICONS
import SendIcon from "@material-ui/icons/Send";

// CSS
import "../css/requestsSent.css";

function RequestsSent({ usersListId }) {
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

    usersListId.forEach((userId) => {
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

  // cancel friend request
  const cancelFriendRequestFunc = (currentUserId, cancelUserId) => {
    dispatch(cancelRequest(currentUserId, cancelUserId));
  };

  return (
    <div className="requestsSent">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={openMenu}
      >
        Requests Sent
      </Button>
      {users.length === 0 ? null : (
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
                color="secundary"
                size="small"
                endIcon={<SendIcon />}
                onClick={() =>
                  cancelFriendRequestFunc(
                    currentUser.user.facebookId,
                    user.facebookId
                  )
                }
              >
                Cancel Request
              </Button>
            </MenuItem>
          ))}
        </Menu>
      )}
    </div>
  );
}

export default RequestsSent;
