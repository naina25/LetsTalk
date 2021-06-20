import React from "react";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import firebase from "firebase/app";
import { auth } from "../firebase";

const Login = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();

  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to LetsTalk!</h2>
        <div
          className="login-button google"
          onClick={() => auth.signInWithRedirect(googleProvider)}>
          <GoogleOutlined /> Sign in with Google
        </div>
        <br /> <br />
        <div
          className="login-button facebook"
          onClick={() => auth.signInWithRedirect(facebookProvider)}>
          <FacebookOutlined /> Sign in with Facebook
        </div>
      </div>
    </div>
  );
};

export default Login;
