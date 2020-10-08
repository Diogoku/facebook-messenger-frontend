import {
  GET_CONVERSATION,
  SEND_MESSAGE,
  SET_FRIEND_NAME_CHAT,
} from "../actions/message/actionTypes";

const initialState = {
  chatId: null,
  conversation: [],
  friendName: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONVERSATION:
      return {
        ...state,
        chatId: action.chatId,
        conversation: action.conversation.reverse(),
      };
    case SET_FRIEND_NAME_CHAT:
      return {
        ...state,
        friendName: action.friendName,
      };
    case SEND_MESSAGE:
      return {
        ...state,
        conversation: [...state.conversation, action.message],
      };
    default:
      return state;
  }
};
