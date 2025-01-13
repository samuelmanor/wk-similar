import React, { useEffect, useState } from "react";
import { FC } from "react";
import { useSelector } from "react-redux";
import { kanji } from "../reducers/QuestionReducer";
import { Option } from "./Option";

interface QuestionProps {}

export const Question: FC<QuestionProps> = () => {
  const [optionIds, setOptionIds] = useState<number[]>([]);
  const kanji = useSelector(
    (state: { question: { kanji: kanji } }) => state.question.kanji
  );
  const questionAnswered = useSelector(
    (state: { question: { answered: boolean } }) => state.question.answered
  );
  const questionCorrect = useSelector(
    (state: { question: { correct: boolean } }) => state.question.correct
  );

  /**
   * Generates question options from selected kanji's similar kanji, and selected kanji
   */
  const pickOptions = () => {
    let arr = [...kanji.similarIds]; // copy array

    // if more than 3 similar kanji, pick 3 random ones
    if (arr.length > 3) {
      arr.sort(() => Math.random() - 0.5); // randomize array
      arr = arr.slice(0, 3); // take first 3 elements
    }

    arr.push(kanji.id); // add selected kanji to end of array

    // randomize array
    arr = arr.sort(() => Math.random() - 0.5);

    setOptionIds(arr);
  };

  useEffect(() => {
    pickOptions();
  }, [kanji]);

  return (
    <div className={`${kanji.id === 0 ? "hidden" : ""} mt-5`}>
      <div className="flex flex-col justify-center items-center">
        <h2 className="phone:text-2xl tablet:text-3xl select-none font-body text-text">
          select the kanji that means
        </h2>
        <h1 className="phone:text-5xl tablet:text-6xl font-body text-text">
          {kanji.meanings[0]}
        </h1>
        <h3 className="phone:text-2xl tablet: text-4xl font-body text-text">
          {kanji.meanings.map((meaning: string, i: number) => {
            if (i === 0) {
              return null;
            } else if (i === kanji.meanings.length - 1) {
              return meaning;
            } else {
              return meaning + ", ";
            }
          })}
        </h3>
      </div>
      <div className="grid phone:grid-cols-1 tablet:grid-cols-2 phone:gap-4 tablet:gap-8 w-fit mx-auto my-4 border border-red">
        {optionIds.map((id: number, i: number) => (
          <div className="w-52" key={`option-${id}`}>
            <Option key={id} id={id} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
};
