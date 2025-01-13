import axios from "axios";
import React, { useEffect, useState } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLevel } from "../reducers/UserReducer";

interface ModeSelectProps {}

export const ModeSelect: FC<ModeSelectProps> = () => {
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  const userLevel = useSelector(
    (state: { user: { level: number } }) => state.user.level
  );
  const apiKey = useSelector(
    (state: { user: { apiKey: string } }) => state.user.apiKey
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (userLevel === 0) {
      axios
        .get("https://api.wanikani.com/v2/user", {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch(setLevel(res.data.data.level));
            setSelectedLevel(res.data.data.level);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="bg-background w-full h-screen flex justify-center items-center flex-col">
      <div className="w-1/3 mx-auto flex flex-col gap-3">
        <div className="collapse">
          <input type="radio" name="mode-select" />
          <div className="collapse-title bg-pink text-paper">
            <p className="text-2xl font-bold text-center pl-6">
              study by level
            </p>
          </div>
          <div className="collapse-content bg-paper text-text">
            <p className="pt-2">select level range to study from:</p>
            <div className="flex justify-center items-center gap-2">
              <p className="w-3">0</p>
              <input
                type="range"
                step="1"
                min="1"
                max={userLevel}
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(parseInt(e.target.value))}
                id="level-range"
                className="w-52"
              />
              <p className="w-5">{selectedLevel}</p>
            </div>
            <p onClick={() => console.log(userLevel)}>test</p>
          </div>
        </div>
        <div className="collapse">
          <input type="radio" name="mode-select" />
          <div className="collapse-title bg-pink text-paper">
            <p className="text-2xl font-bold text-center pl-6">
              study by srs stage
            </p>
          </div>
          <div className="collapse-content bg-paper text-text">
            <p className="pt-2">test</p>
          </div>
        </div>
        <div className="collapse">
          <input type="radio" name="mode-select" />
          <div className="collapse-title bg-pink text-paper">
            <p className="text-2xl font-bold text-center pl-6">study random</p>
          </div>
          <div className="collapse-content bg-paper text-text">content 3</div>
        </div>
      </div>
    </div>
  );
};

// const [showWelcome, setShowWelcome] = useState(true);
// const [gameInitialized, setGameInitialized] = useState(false);
// const [availableKanji, setAvailableKanji] = useState(0); // list of kanji objects from the api
// const [currentKanji, setCurrentKanji] = useState(null); // random kanji object from the api
// const kanji = useSelector((state) => state.question.kanji); // current valid kanji object from the store
// const questionAnswered = useSelector((state) => state.question.answered); // if the question has been answered

// const apiKey = useSelector((state) => state.user.apiKey);

// const dispatch = useDispatch();

// /**
//  * Gets a list of kanji that are available to study
//  */
// const getAvailableKanji = () => {
//   axios
//     .get(
//       "https://api.wanikani.com/v2/assignments?started=true&subject_types=kanji",
//       {
//         headers: {
//           Authorization: `Bearer ${apiKey}`,
//         },
//       }
//     )
//     .then((res) => {
//       // console.log(res.data);
//       // const totalAvailableKanji = res.data.total_count;

//       if (res.data.total_count > 0) {
//         setAvailableKanji(res.data.data);
//         pickRandomKanji(res.data.data);
//       } else {
//         console.log("no kanji available");
//       }
//     });
// };

// /**
//  * Fetches the kanji with the given id
//  * @param {number} id the id of the kanji to fetch
//  */
// const fetchKanji = (id) => {
//   axios
//     .get(`https://api.wanikani.com/v2/subjects/${id}`, {
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//       },
//     })
//     .then((res) => {
//       // console.log("fetchkanji", res.data);
//       // console.log(res.data.data.visually_similar_subject_ids);
//       setCurrentKanji({ ...res.data.data, id: res.data.id });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// /**
//  * Picks a random kanji from the available kanji, then fetches it
//  * @param {array} data the array of kanji objects to pick from; defaults to {@link availableKanji}
//  */
// const pickRandomKanji = (data = availableKanji) => {
//   const limit = data.length > 500 ? 500 : data.length;
//   const randomIndex = Math.floor(Math.random() * limit);

//   // console.log(data[randomIndex]);
//   if (data[randomIndex]?.data !== undefined) {
//     fetchKanji(data[randomIndex].data.subject_id);
//   }
// };

// /**
//  * Removes the kanji with the given id from the available kanji array
//  */
// const removeKanji = (id) => {
//   setAvailableKanji((prev) => {
//     const newAvailableKanji = [...prev];
//     newAvailableKanji.splice(
//       newAvailableKanji.findIndex((k) => k.data.subject_id === id),
//       1
//     );
//     return newAvailableKanji;
//   });
// };

// /**
//  * Resets the question to the next one
//  */
// const nextQuestion = () => {
//   // pickRandomKanji();
//   setTimeout(() => {
//     removeKanji(kanji.id);
//     dispatch(setAnswered(false));
//     dispatch(setCorrect(false));
//   }, 200);
//   pickRandomKanji();
// };

// const startGame = () => {
//   setGameInitialized(true);
//   getAvailableKanji();
// };
