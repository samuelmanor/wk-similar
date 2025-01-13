import axios from "axios";
import React, { useState } from "react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { setApiKey } from "../reducers/UserReducer";
import { LuClipboardPaste } from "react-icons/lu";
import { IconContext } from "react-icons";

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

  /**
   * Tried to get user info from wanikani api using the provided api key
   * If successful, saves the api key to local storage and redux store
   * If unsuccessful, shows error message
   */
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
        handleError();
      });
  };

  /**
   * Gets api key from clipboard
   */
  const getKeyFromClipboard = () => {
    navigator.clipboard.readText().then((text) => {
      setKey(text);
    });
  };

  return (
    <div className="bg-background w-full h-screen flex flex-col justify-center items-center font-body text-text">
      <p className="phone:text-7xl tablet:text-8xl font-bold mb-5 text-center phone:w-2/3">
        wk similar
      </p>
      <div className="flex justify-center items-center mb-2">
        <label>
          <div className="label -mb-1">
            <span className="label-text text-lg">enter api token:</span>
          </div>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className={"input input-bordered"}
          />
        </label>
        <button
          onClick={getKeyFromClipboard}
          className="btn mt-10 ml-2 text-sm  text-center border bg-blue"
        >
          <IconContext.Provider value={{ size: "1.8em", color: "white" }}>
            <LuClipboardPaste />
          </IconContext.Provider>
        </button>
      </div>
      <span className={`${showErrorText ? "" : "hidden"} text-red select-none`}>
        invalid api key!
      </span>
      <p className="mt-1 text-center phone:w-3/4 text-sm">
        wk-similar does not need any permissions other than{" "}
        <span className="bg-paper text-red rounded p-1">all_data:read</span>{" "}
        <br />
        i.e., practicing here doesn't affect your wanikani account!
      </p>
      <button
        onClick={handleSubmit}
        disabled={key.length === 0}
        className="btn btn-lg bg-pink text-paper font-mono font-extrabold text-4xl m-5 hover:bg-pink hover:drop-shadow-md"
      >
        行こう
      </button>
      <p style={{ display: showErrorText ? "" : "none" }}>invalid api key!</p>
    </div>
  );
};
