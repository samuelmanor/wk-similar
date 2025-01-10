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

  const pickOptions = () => {
    let arr = kanji.similarIds.map((k) => k); // copy array

    // if more than 3 similar kanji, pick 3 random ones
    if (arr.length > 3) {
      let pickedIds: number[] = []; // array to hold picked ids
      // pick 3 random ids
      for (let i = 0; i < 3; i++) {
        let randomIndex = Math.floor(Math.random() * arr.length);
        pickedIds.push(arr[randomIndex]);
        arr.splice(randomIndex, 1);
      }
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
      {/* <button onClick={() => pickOptions()}>test</button> */}
      <div>
        {optionIds.map((id: number) => (
          <Option key={id} id={id} />
        ))}
      </div>
    </div>
  );
};
