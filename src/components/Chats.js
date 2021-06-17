import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine, getOrCreateChat } from "react-chat-engine";
import { auth } from "../firebase";

import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  const private_key = process.env.REACT_APP_CHAT_ENGINE_KEY;
  const project_id = process.env.REACT_APP_CHAT_ENGINE_ID;

  const history = useHistory();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  console.log(user);

  const handleLogout = async () => {
    await auth.signOut();

    history.push("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }

    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": project_id,
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);
          axios
            .post("https://api.chatengine.io/users", formdata, {
              headers: {
                "private-key": private_key,
              },
            })
            .then(() => {
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
  }, [user, history, private_key, project_id]);

  if (!user || loading) return "Loading...";

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">LetsTalk</div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID={project_id}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
