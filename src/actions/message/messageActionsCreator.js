import { GET_CONVERSATION, SEND_MESSAGE } from "./actionTypes";

// AXIOS
import axios from "../../axios";

// MESSAGE ACTIONS CREATOR

// get conversation
export const getConversation = (chatId) => {
  return (dispatch) => {
    axios
      .get(`chat/${chatId}`)
      .then(({ data }) => {
        dispatch({
          type: GET_CONVERSATION,
          chatId: data._id,
          conversation: data.conversation,
        });
      })
      .catch((err) => console.log(err));
  };
};

// send message
export const sendMessage = (chatId, currentUserId, message) => {
  return (dispatch) => {
    axios
      .post(`chat/${chatId}`, {
        from: currentUserId,
        text: message,
      })
      .then(({ data }) => {
        dispatch({
          type: SEND_MESSAGE,
          message: data.newMessage,
        });
      })
      .catch((err) => console.log(err, "vim aqui"));
  };
};
