import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Welcome } from "./components/Welcome";
import { useDispatch } from "react-redux";
import { setApiKey } from "./reducers/UserReducer";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  const dispatch = useDispatch();
  // const [kanji, setKanji] = useState("");
  // const [similar, setSimilar] = useState([]);

  // const getKanji = (id) => {
  //   axios
  //     .get(`https://api.wanikani.com/v2/subjects/${id}/`, {
  //       headers: {
  //         Authorization: "Bearer 736760db-bfa6-4465-91e0-24c14138736c",
  //       },
  //     })
  //     .then((response) => {
  //       setKanji(response.data.data);
  //       response.data.data.visually_similar_subject_ids.map((id) => {
  //         axios
  //           .get(`https://api.wanikani.com/v2/subjects/${id}/`, {
  //             headers: {
  //               Authorization: "Bearer 736760db-bfa6-4465-91e0-24c14138736c",
  //             },
  //           })
  //           .then((response) => {
  //             setSimilar((prev) => [...prev, response.data.data]);
  //           });
  //       });
  //     });
  // };

  useEffect(() => {
    const apiKey = JSON.parse(localStorage.getItem("apiKey"))?.apiKey;

    if (apiKey) {
      dispatch(setApiKey(apiKey));
      setShowWelcome(false);
    }
  }, []);

  return (
    <div className="App">
      {/* <button onClick={() => getKanji(479)}>get</button>
      <h1>{kanji.characters}</h1>
      <div onClick={() => console.log(similar)}>
        {similar?.map((kanji) => (
          <p key={kanji.characters} onClick={() => console.log(kanji)}>
            {kanji.characters}
          </p>
        ))}
      </div> */}
      {showWelcome ? <Welcome hide={() => setShowWelcome(false)} /> : null}
    </div>
  );
}

export default App;
