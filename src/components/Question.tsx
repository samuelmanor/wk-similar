import React from "react";
import { FC } from "react";
import { Kanji, nextQuestion } from "../reducers/QuestionReducer";
import { Option } from "./Option";
import { useAppDispatch, useAppSelector } from "../hooks";

interface QuestionProps {}

export const Question: FC<QuestionProps> = () => {
  const kanji = useAppSelector((state) => state.question.currentKanji);
  const similarKanji = useAppSelector(
    (state) => state.question.currentSimilarKanji
  );
  const validkanji = useAppSelector((state) => state.question.validKanji);

  const questionAnswered = useAppSelector((state) => state.question.answered);

  const dispatch = useAppDispatch();

  const next = () => {
    dispatch(nextQuestion());
  };

  return (
    <div className={`mt-5`}>
      <p onClick={() => console.log(validkanji)}>test</p>
      <div className="flex flex-col justify-center items-center">
        <h2 className="phone:text-2xl tablet:text-3xl select-none font-body text-text mb-2">
          select the kanji that means
        </h2>
        <h1 className="phone:text-5xl tablet:text-6xl font-body text-text mb-1 lowercase">
          {kanji.meanings[0]}
        </h1>
        <h3 className="phone:text-2xl tablet: text-4xl font-body text-text lowercase">
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
      <div className="grid phone:grid-cols-1 tablet:grid-cols-2 phone:gap-4 tablet:gap-8 w-fit mx-auto my-4">
        {similarKanji.map((kanji: Kanji, i: number) => (
          <Option index={i} kanji={kanji} key={kanji.id} />
        ))}
      </div>
      <button
        onClick={next}
        className={`phone:text-8xl tablet:text-9xl w-fit mx-auto ${
          questionAnswered ? "text-text" : "text-background"
        }`}
        disabled={!questionAnswered}
      >
        →
      </button>
    </div>
  );
};
