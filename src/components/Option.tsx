import React, { useEffect, useState } from "react";
import { FC } from "react";
import { kanji } from "../reducers/QuestionReducer";
import axios from "axios";
import { useSelector } from "react-redux";

interface OptionProps {
  id: number;
}

export const Option: FC<OptionProps> = ({ id }) => {
  const [kanji, setKanji] = useState<kanji>({
    character: "",
    url: "",
    level: 0,
    meanings: [],
    similarIds: [],
  });
  const apiKey = useSelector((state: any) => state.user.apiKey);

  useEffect(() => {
    axios
      .get(`https://api.wanikani.com/v2/subjects/${id}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })
      .then((res) => {
        setKanji({
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

  return (
    <div onClick={() => console.log(kanji)}>
      {/* <p onClick={() => console.log(id)}>option</p> */}
      <h1>{kanji.character}</h1>
    </div>
  );
};
