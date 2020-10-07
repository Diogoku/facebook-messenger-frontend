import { GET_CONVERSATION, SEND_MESSAGE } from "../actions/message/actionTypes";

const initialState = {
  chatId: null,
  conversation: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONVERSATION:
      return {
        chatId: action.chatId,
        conversation: action.conversation.reverse(),
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
