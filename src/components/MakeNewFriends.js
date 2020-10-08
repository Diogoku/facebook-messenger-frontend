import React, { useState, useEffect } from "react";

// REACT-REDUX
import { useDispatch, useSelector } from "react-redux";
import { friendRequest, blockUser } from "../actions/user/userActionsCreator"; // ACTIONS

// AXIOS
import axios from "../axios";

// MATERIAL-UI
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// MATERIAL-UI ICONS
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import BlockIcon from "@material-ui/icons/Block";

// CSS
import "../css/makeNewFriends.css";

function MakeNewFriends({ usersListId }) {
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
  }, [usersListId]);

  // open menu
  const openMenu = (event) => {
    setIsOpen(event.currentTarget);
  };

  // close menu
  const closeMenu = () => {
    setIsOpen(null);
  };

  // send friend request
  const friendRequestFunc = (currentUserId, friendUserId) => {
    dispatch(friendRequest(currentUserId, friendUserId));
  };

  // block user
  const blockUserFunc = (currentUserId, blockUserId) => {
    dispatch(blockUser(currentUserId, blockUserId));
  };

  return (
    <div className="makeNewFriends">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={openMenu}
      >
        Add Friends
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
                color="primary"
                size="small"
                endIcon={<PersonAddIcon />}
                onClick={() =>
                  friendRequestFunc(
                    currentUser.user.facebookId,
                    user.facebookId
                  )
                }
              >
                Friend Request
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                endIcon={<BlockIcon />}
                onClick={() =>
                  blockUserFunc(currentUser.user.facebookId, user.facebookId)
                }
              >
                Block
              </Button>
            </MenuItem>
          ))}
        </Menu>
      )}
    </div>
  );
}

export default MakeNewFriends;
