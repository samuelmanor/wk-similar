import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Welcome } from "./components/Welcome";
import { Question } from "./components/Question";
import { useDispatch, useSelector } from "react-redux";
import { setApiKey } from "./reducers/UserReducer";
import { setKanji, setAnswered, setCorrect } from "./reducers/QuestionReducer";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [gameInitialized, setGameInitialized] = useState(false);
  const [availableKanji, setAvailableKanji] = useState(0); // list of kanji objects from the api
  const [currentKanji, setCurrentKanji] = useState(null); // random kanji object from the api
  const kanji = useSelector((state) => state.question.kanji); // current valid kanji object from the store
  const questionAnswered = useSelector((state) => state.question.answered); // if the question has been answered

  const apiKey = useSelector((state) => state.user.apiKey);

  const dispatch = useDispatch();

  /**
   * Gets a list of kanji that are available to study
   */
  const getAvailableKanji = () => {
    axios
      .get(
        "https://api.wanikani.com/v2/assignments?started=true&subject_types=kanji",
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        // const totalAvailableKanji = res.data.total_count;

        if (res.data.total_count > 0) {
          setAvailableKanji(res.data.data);
          pickRandomKanji(res.data.data);
        } else {
          console.log("no kanji available");
        }
      });
  };

  /**
   * Fetches the kanji with the given id
   * @param {number} id the id of the kanji to fetch
   */
  const fetchKanji = (id) => {
    axios
      .get(`https://api.wanikani.com/v2/subjects/${id}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })
      .then((res) => {
        // console.log("fetchkanji", res.data);
        // console.log(res.data.data.visually_similar_subject_ids);
        setCurrentKanji({ ...res.data.data, id: res.data.id });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * Picks a random kanji from the available kanji, then fetches it
   * @param {array} data the array of kanji objects to pick from; defaults to {@link availableKanji}
   */
  const pickRandomKanji = (data = availableKanji) => {
    const limit = data.length > 500 ? 500 : data.length;
    const randomIndex = Math.floor(Math.random() * limit);

    // console.log(data[randomIndex]);
    if (data[randomIndex]?.data !== undefined) {
      fetchKanji(data[randomIndex].data.subject_id);
    }
  };

  /**
   * Removes the kanji with the given id from the available kanji array
   */
  const removeKanji = (id) => {
    setAvailableKanji((prev) => {
      const newAvailableKanji = [...prev];
      newAvailableKanji.splice(
        newAvailableKanji.findIndex((k) => k.data.subject_id === id),
        1
      );
      return newAvailableKanji;
    });
  };

  /**
   * Resets the question to the next one
   */
  const nextQuestion = () => {
    // pickRandomKanji();
    setTimeout(() => {
      removeKanji(kanji.id);
      dispatch(setAnswered(false));
      dispatch(setCorrect(false));
    }, 200);
    pickRandomKanji();
  };

  const startGame = () => {
    setGameInitialized(true);
    getAvailableKanji();
  };

  // on component mount, check if the user has an api key saved in local storage
  useEffect(() => {
    const key = JSON.parse(localStorage.getItem("apiKey"))?.apiKey;

    if (key) {
      dispatch(setApiKey(key));
      setShowWelcome(false);
    }
  }, []);

  // if the current kanji has less than 2 visually similar kanji, pick a new one
  useEffect(() => {
    if (currentKanji !== null && currentKanji !== undefined) {
      if (currentKanji.visually_similar_subject_ids.length < 1) {
        // remove the current kanji from the available kanji
        removeKanji(currentKanji.id);
        pickRandomKanji();
      } else {
        dispatch(
          setKanji({
            id: currentKanji.id,
            character: currentKanji.characters,
            url: currentKanji.document_url,
            level: currentKanji.level,
            meanings: currentKanji.meanings.map((m) => m.meaning.toLowerCase()),
            similarIds: currentKanji.visually_similar_subject_ids,
          })
        );
      }
    }
  }, [currentKanji]);

  // useEffect(() => {
  //   console.log(kanji);
  // }, [kanji]);

  // study by level
  // study by srs stage ?
  //                    -- study by random --

  if (showWelcome) {
    return <Welcome hide={() => setShowWelcome(false)} />;
  }

  return (
    <div className="bg-background min-h-screen flex flex-col justify-between">
      {/* {showWelcome ? <Welcome hide={() => setShowWelcome(false)} /> : null} */}
      {!gameInitialized ? (
        <button onClick={startGame}>study</button>
      ) : (
        <Question />
      )}
      {questionAnswered ? (
        <button onClick={() => nextQuestion()}>next</button>
      ) : null}

      {/* <button onClick={() => console.log(currentKanji)}>current</button>
      <br /> */}
      {/* {kanji.character.length === 0 ? (
        <p style={{ display: currentKanji !== null ? "" : "none" }}>
          loading...
        </p>
      ) : (
        <Question />
      )} */}
    </div>
  );
}

export default App;
