import "./App.css";
import { useEffect, useState } from "react";
import { Welcome } from "./components/Welcome";
import { Question } from "./components/Question";
import { ModeSelect } from "./components/ModeSelect";
import { Warning } from "./components/Warning";
import { useDispatch, useSelector } from "react-redux";
import { setApiKey } from "./reducers/UserReducer";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [gameInitialized, setGameInitialized] = useState(false);
  const error = useSelector((state) => state.question.error);

  const dispatch = useDispatch();

  // on component mount, check if the user has an api key saved in local storage
  useEffect(() => {
    const key = JSON.parse(localStorage.getItem("apiKey"))?.apiKey;

    if (key) {
      dispatch(setApiKey(key));
      setShowWelcome(false);
    }
  }, []);

  if (showWelcome) {
    return <Welcome hide={() => setShowWelcome(false)} />;
  }

  if (error) {
    return <Warning />;
  }

  return (
    <div className="bg-background min-h-screen flex flex-col justify-center">
      {!gameInitialized ? (
        <ModeSelect startGame={() => setGameInitialized(true)} />
      ) : (
        <Question />
      )}
    </div>
  );
}

export default App;
