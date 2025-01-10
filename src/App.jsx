import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Welcome } from "./components/Welcome";
import { Question } from "./components/Question";
import { useDispatch, useSelector } from "react-redux";
import { setApiKey } from "./reducers/UserReducer";
import { setKanji } from "./reducers/QuestionReducer";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [availableKanji, setAvailableKanji] = useState(0); // list of kanji objects from the api
  const [currentKanji, setCurrentKanji] = useState(null); // random kanji object from the api
  const kanji = useSelector((state) => state.question.kanji); // current valid kanji object from the store

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
        setCurrentKanji(res.data.data);
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
      if (currentKanji.visually_similar_subject_ids.length < 2) {
        pickRandomKanji();
      } else {
        const defaultMeanings = currentKanji.meanings.map((m) => m.meaning); // default meanings are the ones that are set by wanikani
        const userMeanings = currentKanji.auxiliary_meanings.map(
          (m) => m.meaning
        ); // users can add their own meanings to kanji in wanikani

        dispatch(
          setKanji({
            character: currentKanji.characters,
            url: currentKanji.document_url,
            level: currentKanji.level,
            meanings: [...defaultMeanings, ...userMeanings],
            similarIds: currentKanji.visually_similar_subject_ids,
          })
        );
      }
    }
  }, [currentKanji]);

  useEffect(() => {
    console.log(kanji);
  }, [kanji]);

  // study by level
  // study by srs stage ?
  //                    -- study by random --

  return (
    <div className="App">
      {showWelcome ? <Welcome hide={() => setShowWelcome(false)} /> : null}
      <button onClick={() => getAvailableKanji()}>study</button>
      {/* <button onClick={() => console.log(currentKanji)}>current</button> */}
      <br />
      {kanji.character.length === 0 ? (
        <p style={{ display: currentKanji !== null ? "" : "none" }}>
          loading...
        </p>
      ) : (
        <Question />
      )}
    </div>
  );
}

export default App;
