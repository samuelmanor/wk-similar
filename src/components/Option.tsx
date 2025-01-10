import React, { useEffect, useState } from "react";
import { FC } from "react";
import { kanji } from "../reducers/QuestionReducer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAnswered, setCorrect } from "../reducers/QuestionReducer";

interface OptionProps {
  id: number;
}

export const Option: FC<OptionProps> = ({ id }) => {
  const [selected, setSelected] = useState(false);
  const [kanji, setKanji] = useState<kanji>({
    id: 0,
    character: "",
    url: "",
    level: 0,
    meanings: [],
    similarIds: [],
  });
  const answer = useSelector((state: any) => state.question.kanji.id);
  const apiKey = useSelector((state: any) => state.user.apiKey);

  const questionAnswered = useSelector((state: any) => state.question.answered);
  const questionCorrect = useSelector((state: any) => state.question.correct);

  const dispatch = useDispatch();

  const handleClick = () => {
    if (!questionAnswered) {
      setSelected(true);
      dispatch(setAnswered(true));

      if (id === answer ? true : false) {
        dispatch(setCorrect(true));
      } else {
        dispatch(setCorrect(false));
      }
    }
  };

  useEffect(() => {
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
  }, [id]);

  const bgColor = () => {
    if (questionAnswered) {
      if (questionCorrect) {
        if (id === answer) {
          return "green";
        } else {
          return "gray";
        }
      } else {
        if (id === answer) {
          return "green";
        } else if (selected) {
          return "red";
        } else {
          return "gray";
        }
      }
    }
  };

  return (
    <div onClick={handleClick} style={{ backgroundColor: bgColor() }}>
      <h1>{kanji.character}</h1>
    </div>
  );
};
