import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";

import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": "1094b8b7-5125-4b88-b587-450b3cfd49f0",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      });
  }, [user, history]);

  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };
  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">LetsTalk</div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh-66px)"
        ProjectId="1094b8b7-5125-4b88-b587-450b3cfd49f0"
        UserName="."
        UserSecret="."
      />
    </div>
  );
};

export default Chats;
