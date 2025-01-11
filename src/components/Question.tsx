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
    <div>
      {!questionAnswered ? (
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
        </div>
      ) : (
        <div onClick={() => console.log(kanji.id)}>
          {questionCorrect ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" />
            </svg>
          )}
        </div>
      )}
      <div className="border border-black flex flex-row justify-center">
        {optionIds.map((id: number, i: number) => (
          <div className="w-52" key={`option-${id}`}>
            <Option key={id} id={id} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
};
