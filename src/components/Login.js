import React from "react";

// REACT-REDUX
import { useDispatch } from "react-redux";
import { login } from "../actions/user/userActionsCreator";

// REACT-ROUTER-DOM
import { useHistory } from "react-router-dom";

// FIREBASE
import { auth, provider } from "../firebase";

// AXIOS
import axios from "../axios";

// MATERIAL-UI
import Button from "@material-ui/core/Button";
import FacebookIcon from "@material-ui/icons/Facebook";

// CSS
import "../css/login.css";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const facebookLogin = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const fbData = result.user.providerData;
        const user = {
          facebookId: fbData[0].uid,
          name: fbData[0].displayName,
          email: fbData[0].email,
          photoUrl: fbData[0].photoURL,
        };
        axios.post("auth/", user).then((res) => {
          dispatch(login(res.data));
          history.push("/chat");
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login">
      <img
        src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=399&h=399"
        alt="Facebook Messenger Logo"
      />
      <Button
        onClick={facebookLogin}
        variant="contained"
        color="primary"
        startIcon={<FacebookIcon>Login with Facebook</FacebookIcon>}
      >
        Login with Facebook
      </Button>
    </div>
  );
}

export default Login;
