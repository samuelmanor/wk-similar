import axios from "axios";
import React, { useEffect, useState } from "react";
import { FC } from "react";
import { setLevel } from "../reducers/UserReducer";
import { useAppDispatch, useAppSelector } from "../hooks";
import { initStudyByLevel, initStudyBySrs } from "../reducers/QuestionReducer";

interface ModeSelectProps {
  startGame: () => void;
}

/**
 * Allows the user to select a study mode
 * @param startGame - The function to start the game
 */
export const ModeSelect: FC<ModeSelectProps> = ({ startGame }) => {
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  const [selectedSrs, setSelectedSrs] = useState([
    {
      name: "apprentice",
      color: "#ff00aa",
      selected: false,
      id: 5,
    },
    {
      name: "guru",
      color: "#aa00ff",
      selected: false,
      id: 6,
    },
    {
      name: "master",
      color: "#304ed1",
      selected: false,
      id: 7,
    },
    {
      name: "enlightened",
      color: "#00aaff",
      selected: false,
      id: 8,
    },
    {
      name: "burned",
      color: "#333333",
      selected: false,
      id: 9,
    },
  ]);

  const userLevel = useAppSelector((state) => state.user.level);
  const apiKey = useAppSelector((state) => state.user.apiKey);

  const validKanji = useAppSelector((state) => state.question.validKanji);

  const dispatch = useAppDispatch();

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
            if (res.data.data.level === 0) {
              console.log("no level data available");
            }
            dispatch(setLevel(res.data.data.level));
            setSelectedLevel(res.data.data.level);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const studyByLevel = () => {
    const range = [];
    for (let i = 1; i <= selectedLevel; i++) {
      range.push(i);
    }

    console.log("by level");
    dispatch(initStudyByLevel(range.toString()));
    startGame();
  };

  const studyBySrs = () => {
    const selectedSrsIds = selectedSrs
      .filter((srs) => srs.selected)
      .map((srs) => srs.id);

    console.log("by srs");
    dispatch(initStudyBySrs(selectedSrsIds.toString()));
    startGame();
  };

  return (
    <div className="bg-background w-full h-screen flex justify-center items-center flex-col font-body">
      <p onClick={() => console.log(validKanji)}>valid</p>
      <div className="w-1/3 mx-auto flex flex-col gap-10">
        <div className="collapse">
          <input type="radio" name="mode-select" />
          <div className="collapse-title bg-pink text-paper cursor-pointer">
            <p className="text-2xl font-bold text-center pl-6">
              study by level
            </p>
          </div>
          <div className="collapse-content bg-paper text-text flex justify-center items-center flex-col">
            <p className="pt-5">select level range to study from:</p>
            <div className="flex justify-center items-center gap-2">
              <p className="w-3 text-lg">0</p>
              <input
                type="range"
                step="1"
                min="1"
                max={userLevel}
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(parseInt(e.target.value))}
                id="level-range"
                className="w-52 range [--range-shdw:#00aaff]"
              />
              <p className="w-5 font-body text-lg">{selectedLevel}</p>
            </div>
            <button
              onClick={studyByLevel}
              className="btn btn-outline font-mono text-lg bg-paper text-text w-36 mx-auto mt-5"
            >
              勉強しよう
            </button>
          </div>
        </div>
        <div className="collapse">
          <input type="radio" name="mode-select" />
          <div className="collapse-title bg-pink text-paper cursor-pointer">
            <p className="text-2xl font-bold text-center pl-6">
              study by srs stage
            </p>
          </div>
          <div className="collapse-content bg-paper text-text flex justify-center items-center flex-col">
            <p className="pt-5 pb-1">select stages to study from:</p>
            <div className="form-control flex flex-col justify-center items-center gap-2">
              {selectedSrs.map((srs, i) => (
                <label
                  key={i}
                  className={`label cursor-pointe rounded p-3`}
                  style={{ backgroundColor: srs.color }}
                >
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={srs.selected}
                    onChange={(e) => {
                      const newSrs = [...selectedSrs];
                      newSrs[i].selected = e.target.checked;
                      setSelectedSrs(newSrs);
                    }}
                  />
                  <span className="label-text pl-2 w-36 text-paper">
                    {srs.name}
                  </span>
                </label>
              ))}
            </div>
            <button
              onClick={studyBySrs}
              className="btn btn-outline font-mono text-lg bg-paper text-text w-36 mx-auto mt-5"
            >
              勉強しよう
            </button>
          </div>
        </div>
        <div className="collapse">
          <input type="radio" name="mode-select" />
          <div className="collapse-title bg-pink text-paper cursor-pointer">
            <p className="text-2xl font-bold text-center pl-6">
              study most recent
            </p>
          </div>
          <div className="collapse-content bg-paper text-text">
            <p className="pt-5 pb-1">select stages to study from:</p>
          </div>
        </div>
      </div>
    </div>
  );
};
