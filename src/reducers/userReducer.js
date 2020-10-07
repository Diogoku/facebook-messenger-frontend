import {
  LOGIN,
  LOGOUT,
  FRIEND_REQUEST,
  BLOCK_USER,
  CANCEL_REQUEST,
  ACCEPT_FRIEND_REQUEST,
  REJECT_FRIEND_REQUEST,
} from "../actions/user/actionTypes";

const initialState = {
  user: {
    friendsRequestsReceived: [],
    friendsRequestsSent: [],
    blockedList: [],
    blockedByList: [],
    _id: "5f78fdd5e2ca172d94950086",
    name: "Diogo Ribeiro",
    facebookId: "3603061043090321",
    photoUrl: "https://graph.facebook.com/3603061043090321/picture",
    friends: [{ facebookId: "2", chatId: "5f7bad058d73a74568aba4d3" }],
  },
  isAuthenticated: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
      };
    case FRIEND_REQUEST:
      return {
        ...state,
        user: {
          ...state.user,
          friendsRequestsSent: [
            ...state.user.friendsRequestsSent,
            action.userRequestedId,
          ],
        },
      };
    case BLOCK_USER:
      return {
        ...state,
        user: {
          ...state.user,
          blockedList: [...state.user.blockedList, action.blockUserId],
        },
      };
    case CANCEL_REQUEST:
      return {
        ...state,
        user: {
          ...state.user,
          friendsRequestsSent: [
            ...state.user.friendsRequestsSent.filter(
              (userId) => userId !== action.cancelUserId
            ),
          ],
        },
      };
    case ACCEPT_FRIEND_REQUEST:
      return {
        ...state,
        user: {
          ...state.user,
          friendsRequestsReceived: [
            ...state.user.friendsRequestsReceived.filter(
              (userId) => userId !== action.acceptUserId
            ),
          ],
          friends: [
            ...state.user.friends,
            { facebookId: action.acceptUserId, chatId: action.chatId },
          ],
        },
      };
    case REJECT_FRIEND_REQUEST:
      return {
        ...state,
        user: {
          ...state.user,
          friendsRequestsReceived: [
            ...state.user.friendsRequestsReceived.filter(
              (userId) => userId !== action.rejectUserId
            ),
          ],
        },
      };
    case LOGOUT:
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
};
