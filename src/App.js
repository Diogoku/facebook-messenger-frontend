import React, { useEffect } from "react";

// PUSHER
import Pusher from "pusher-js";

// REACT REDUX
import { useSelector, useDispatch } from "react-redux";
import { getConversation } from "./actions/message/messageActionsCreator"; // ACTIONS

// REACT ROUTER DOM
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";

// COMPONENTS
import Login from "./components/Login";
import ChatPage from "./components/ChatPage";

// CSS
import "./css/App.css";

const pusher = new Pusher("67580da491bb0ce94bc7", {
  cluster: "eu",
});

function App() {
  const currentChat = useSelector((state) => state.messageReducer);
  const dispatch = useDispatch(); // dispatcher

  useEffect(() => {
    const channel = pusher.subscribe("chats");
    channel.bind("newChat", function (data) {
      if (data.change.documentKey._id === currentChat.chatId) {
        dispatch(getConversation(currentChat.chatId));
      }
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [currentChat.chatId, dispatch]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/chat" component={ChatPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
