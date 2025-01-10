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
    <div>
      <h2>select the kanji that means</h2>
      <h1>{kanji.meanings[0]}</h1>
      <h3>
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
      <div>
        {optionIds.map((id: number) => (
          <Option key={id} id={id} />
        ))}
      </div>
    </div>
  );
};
