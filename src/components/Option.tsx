import React, { useState } from "react";
import { FC } from "react";
import { Kanji } from "../reducers/QuestionReducer";
import { answerQuestion } from "../reducers/QuestionReducer";
import { useAppDispatch, useAppSelector } from "../hooks";

interface OptionProps {
  index: number;
  kanji: Kanji;
}

/**
 * Displays a single kanji option
 * @param index - The index of the kanji in the list
 * @param kanji - The kanji object to display
 */
export const Option: FC<OptionProps> = ({ index, kanji }) => {
  const [selected, setSelected] = useState(false);
  const answer = useAppSelector((state) => state.question.currentKanji);

  const questionAnswered = useAppSelector((state) => state.question.answered);
  const questionCorrect = useAppSelector((state) => state.question.correct);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (!questionAnswered) {
      setSelected(true);
      dispatch(answerQuestion(kanji));
    }
  };

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
        data-tip={kanji.meanings.map((m: string) => m.toLowerCase()).join(", ")}
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
