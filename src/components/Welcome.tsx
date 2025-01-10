import axios from "axios";
import React, { useState } from "react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { setApiKey } from "../reducers/UserReducer";

interface WelcocmeProps {
  hide: () => void;
}

export const Welcome: FC<WelcocmeProps> = ({ hide }) => {
  const [key, setKey] = useState("");
  const [showErrorText, setShowErrorText] = useState(false);

  const dispatch = useDispatch();

  const handleError = () => {
    setShowErrorText(true);

    setTimeout(() => {
      setShowErrorText(false);
    }, 5000);
  };

  const handleSubmit = () => {
    axios
      .get("https://api.wanikani.com/v2/user", {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("valid api key", res.data);
          dispatch(setApiKey(key));
          localStorage.setItem("apiKey", JSON.stringify({ apiKey: key }));
          hide();
        }
      })
      .catch((err) => {
        console.log("invalid api key", err);
        handleError();
      });
  };

  return (
    <div>
      <p>enter api key:</p>
      <input type="text" value={key} onChange={(e) => setKey(e.target.value)} />
      <button onClick={handleSubmit}>go</button>
      <p style={{ display: showErrorText ? "" : "none" }}>invalid api key!</p>
    </div>
  );
};
