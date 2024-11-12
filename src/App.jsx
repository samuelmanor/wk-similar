import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
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
    </div>
  );
}

export default App;
