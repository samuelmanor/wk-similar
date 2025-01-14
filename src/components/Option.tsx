import React, { useEffect, useState } from "react";
import { FC } from "react";
import { Kanji } from "../reducers/QuestionReducer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAnswered, setCorrect } from "../reducers/QuestionReducer";
import { useAppSelector } from "../hooks";

interface OptionProps {
  // id: number;
  index: number;
  kanji: Kanji;
}

export const Option: FC<OptionProps> = ({ index, kanji }) => {
  const [selected, setSelected] = useState(false);
  const answer = useAppSelector((state) => state.question.currentKanji);
  // const apiKey = useAppSelector((state) => state.user.apiKey);

  const questionAnswered = useAppSelector((state) => state.question.answered);
  const questionCorrect = useAppSelector((state) => state.question.correct);

  const dispatch = useDispatch();

  const handleClick = () => {
    if (!questionAnswered) {
      // setSelected(true);
      // dispatch(setAnswered(true));
      // if (kanji.id === answer.id ? true : false) {
      //   dispatch(setCorrect(true));
      // } else {
      //   dispatch(setCorrect(false));
      // }
      console.log(kanji.id === answer.id);
    }
  };

  // useEffect(() => {
  //   // if (answer.id !== 0) {
  //   //   axios
  //   //     .get(`https://api.wanikani.com/v2/subjects/${id}`, {
  //   //       headers: {
  //   //         Authorization: `Bearer ${apiKey}`,
  //   //       },
  //   //     })
  //   //     .then((res) => {
  //   //       setKanji({
  //   //         id: res.data.id,
  //   //         character: res.data.data.characters,
  //   //         url: res.data.data.document_url,
  //   //         level: res.data.data.level,
  //   //         meanings: res.data.data.meanings[0].meaning.toLowerCase(),
  //   //         similarIds: res.data.data.visually_similar_subject_ids,
  //   //       });
  //   //     })
  //   //     .catch((err) => {
  //   //       console.log(err);
  //   //     });
  //   // }
  // }, [id]);

  const bgColor = () => {
    if (questionAnswered) {
      if (questionCorrect) {
        if (kanji.id === answer.id) {
          return "#88cc00";
        } else {
          return "#b2b2b2";
        }
      } else {
        if (kanji.id === answer.id) {
          return "#88cc00";
        } else if (selected) {
          return "#ff0033";
        } else {
          return "#b2b2b2";
        }
      }
    } else {
      return "#aa00ff";
    }
  };

  return (
    <div className={"w-fit mx-auto"}>
      <div
        className={`tooltip font-body ${
          questionAnswered && kanji.id !== answer.id
            ? "[--tooltip-color:#b2b2b2] [--tooltip-text-color:text]"
            : "[--tooltip-color:transparent] [--tooltip-text-color:transparent]"
        }
        phone:tooltip-right
        ${index % 2 === 0 ? "tablet:tooltip-left" : "tablet:tooltip-right"}
        `}
        data-tip={kanji.meanings}
      >
        <button
          className={`btn phone:w-36 phone:h-36 tablet:w-48 tablet:h-48 laptop:w-52 laptop:h-52 hover:drop-shadow-lg border-none inline-block relative cursor-${
            questionAnswered ? "default" : "pointer"
          }`}
          onClick={handleClick}
          style={{ backgroundColor: bgColor() }}
          disabled={questionAnswered}
        >
          <h1
            className="phone:text-8xl tablet:text-9xl text-paper drop-shadow font-mono"
            style={{ textShadow: "0 5px 0 rgba(0, 0, 0, 0.25)" }}
          >
            {kanji.character}
          </h1>
        </button>
      </div>
    </div>
  );
};
