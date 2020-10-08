import {
  LOGIN,
  LOGOUT,
  FRIEND_REQUEST,
  BLOCK_USER,
  CANCEL_REQUEST,
  ACCEPT_FRIEND_REQUEST,
  REJECT_FRIEND_REQUEST,
} from "./actionTypes";

// AXIOS
import axios from "../../axios";

// USER ACTIONS CREATOR

// login
export const login = (user) => {
  return {
    type: LOGIN,
    user: user,
  };
};

// friend request
export const friendRequest = (from, to) => {
  return (dispatch) => {
    axios
      .put("friends/request/send", { from: from, to: to })
      .then((response) => {
        if (response.status == 200) {
          dispatch({ type: FRIEND_REQUEST, userRequestedId: to });
        }
      })
      .catch((err) => console.log(err));
  };
};

// block user
export const blockUser = (currentUserId, blockUserId) => {
  return (dispatch) => {
    axios
      .put("friends/block", {
        currentUserId: currentUserId,
        blockUserId: blockUserId,
      })
      .then((response) => {
        if (response.status === 200)
          dispatch({ type: BLOCK_USER, blockUserId: blockUserId });
      })
      .catch((err) => console.log(err));
  };
};

// cancel request
export const cancelRequest = (currentUserId, cancelUserId) => {
  return (dispatch) => {
    axios
      .put("friends/request/cancel", {
        currentUserId: currentUserId,
        cancelUserId: cancelUserId,
      })
      .then((response) => {
        if (response.status === 200)
          dispatch({ type: CANCEL_REQUEST, cancelUserId: cancelUserId });
      })
      .catch((err) => console.log(err));
  };
};

// accept user
export const acceptFriendRequest = (currentUserId, acceptUserId) => {
  return (dispatch) => {
    axios
      .put("friends/request/accept", {
        currentUserId: currentUserId,
        acceptUserId: acceptUserId,
      })
      .then(({ data }) => {
        console.log(data);
        dispatch({
          type: ACCEPT_FRIEND_REQUEST,
          acceptUserId: acceptUserId,
          chatId: data.chatId,
        });
      })
      .catch((err) => console.log(err));
  };
};

// reject user
export const rejectFriendRequest = (currentUserId, rejectUserId) => {
  return (dispatch) => {
    axios
      .put("friends/request/reject", {
        currentUserId: currentUserId,
        rejectUserId: rejectUserId,
      })
      .then(({ data }) => {
        console.log(data);
        dispatch({ type: REJECT_FRIEND_REQUEST, rejectUserId: rejectUserId });
      })
      .catch((err) => console.log(err));
  };
};

// logout
export const logout = () => {
  return { type: LOGOUT };
};
