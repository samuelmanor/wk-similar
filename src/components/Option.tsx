import React, { useEffect, useState } from "react";
import { FC } from "react";
import { kanji } from "../reducers/QuestionReducer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAnswered, setCorrect } from "../reducers/QuestionReducer";

interface OptionProps {
  id: number;
  index: number;
}

export const Option: FC<OptionProps> = ({ id, index }) => {
  const [selected, setSelected] = useState(false);
  const [kanji, setKanji] = useState<kanji>({
    id: 0,
    character: "",
    url: "",
    level: 0,
    meanings: [],
    similarIds: [],
  });
  const answer = useSelector((state: any) => state.question.kanji);
  const apiKey = useSelector((state: any) => state.user.apiKey);

  const questionAnswered = useSelector((state: any) => state.question.answered);
  const questionCorrect = useSelector((state: any) => state.question.correct);

  const dispatch = useDispatch();

  const handleClick = () => {
    if (!questionAnswered) {
      setSelected(true);
      dispatch(setAnswered(true));

      if (id === answer.id ? true : false) {
        dispatch(setCorrect(true));
      } else {
        dispatch(setCorrect(false));
      }
    }
  };

  useEffect(() => {
    if (answer.id !== 0) {
      axios
        .get(`https://api.wanikani.com/v2/subjects/${id}`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        })
        .then((res) => {
          setKanji({
            id: res.data.id,
            character: res.data.data.characters,
            url: res.data.data.document_url,
            level: res.data.data.level,
            meanings: res.data.data.meanings[0].meaning,
            similarIds: res.data.data.visually_similar_subject_ids,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  const bgColor = () => {
    if (questionAnswered) {
      if (questionCorrect) {
        if (id === answer.id) {
          return "#88cc00";
        } else {
          return "gray";
        }
      } else {
        if (id === answer.id) {
          return "#88cc00";
        } else if (selected) {
          return "#ff0033";
        } else {
          return "gray";
        }
      }
    } else {
      return "#aa00ff";
    }
  };

  return (
    // <div
    //   className={`tooltip tablet:tooltip-right laptop:tooltip-${
    //     index === 0 || index === 2 ? "left" : "right"
    //   } ${questionAnswered && id === answer.id ? "tooltip-open" : ""} ${
    //     answer.character.length === 0 ? "hidden" : ""
    //   }`}
    //   data-tip="hello"
    // >
    <button
      // className="btn w-52 h-52 text-paper"
      className="btn phone:w-40 phone:h-40 w-52 h-52 hover:drop-shadow-lg"
      onClick={handleClick}
      style={{ backgroundColor: bgColor() }}
      disabled={questionAnswered}
    >
      <h1
        className="phone:text-8xl text-9xl text-paper drop-shadow font-mono"
        style={{ textShadow: "0 5px 0 rgba(0, 0, 0, 0.25)" }}
      >
        {kanji.character}
      </h1>
    </button>
    // </div>
  );
};
