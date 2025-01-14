import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

interface ReturnedKanjiData {
  data: {
    amalgamation_subject_ids: number[];
    auxiliary_meanings: [
      {
        meaning: string;
        type: string;
      }
    ];
    characters: string;
    component_subject_ids: number[];
    created_at: string | null;
    document_url: string;
    hidden_at: string | null;
    lesson_position: number;
    level: number;
    meaning_hint: string;
    meaning_mnemonic: string;
    meanings: [
      {
        meaning: string;
        primary: boolean;
        accepted_answer: boolean;
      }
    ];
    reading_hint: string;
    reading_mnemonic: string;
    readings: [
      {
        reading: string;
        primary: boolean;
        accepted_answer: boolean;
        type: string;
      }
    ];
    slug: string;
    visually_similar_subject_ids: number[];
  };
  data_updated_at: string;
  id: number;
  object: "kanji";
  url: string;
}

export interface Kanji {
  id: number;
  character: string;
  url: string;
  level: number;
  meanings: string[];
  similarIds: number[];
}

interface QuestionState {
  currentKanjiId: number;
  answered: boolean;
  correct: boolean | null;
  validKanji: Kanji[];
}

const initialState: QuestionState = {
  currentKanjiId: 0,
  answered: false,
  correct: null,
  validKanji: [],
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setCurrentKanjiId: (state, action) => {
      state.currentKanjiId = action.payload;
    },
    setAnswered: (state, action) => {
      state.answered = action.payload;
    },
    setCorrect: (state, action) => {
      state.correct = action.payload;
    },
    setValidKanji: (state, action) => {
      if (current(state).validKanji.length === 0) {
        state.validKanji = action.payload;
      } else {
        state.validKanji = [...current(state).validKanji, action.payload];
      }
    },
  },
});

export const { setCurrentKanjiId, setAnswered, setCorrect, setValidKanji } =
  questionSlice.actions;

export const initStudy = (
  type: "level" | "srs" | "recent",
  selection: string | null
) => {
  return async (dispatch: any, useState: any) => {
    let url = "https://api.wanikani.com/v2/subjects?types=kanji&started=true";
    switch (type) {
      case "level":
        url += `&levels=${selection}`;
        break;
      case "srs":
        url += `&srs_stages=${selection}`;
        break;
      case "recent":
        break;
      default:
        break;
    }

    const apiKey = useState().user.apiKey;

    // recursively fetch all pages of kanji ids
    const fetchIds = async (url: string | null) => {
      if (url) {
        await axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          })
          .then((res) => {
            console.log("fetched", res.data);

            dispatch(
              setValidKanji(
                res.data.data
                  .filter(
                    (kanji: ReturnedKanjiData) =>
                      kanji.data.visually_similar_subject_ids.length > 1
                  )
                  .map((kanji: ReturnedKanjiData) => {
                    return {
                      id: kanji.id,
                      character: kanji.data.characters,
                      url: kanji.url,
                      level: kanji.data.level,
                      meanings: kanji.data.meanings.map(
                        (meaning) => meaning.meaning
                      ),
                      similarIds: kanji.data.visually_similar_subject_ids,
                    };
                  })
              )
            );

            if (
              res.data.total_count > res.data.pages.per_page &&
              res.data.pages.next_url
            ) {
              console.log("fetching next page");
              fetchIds(res.data.pages.next_url);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    await fetchIds(url);
  };
};

export default questionSlice.reducer;
// holds selected kanji, possible answers, answer, etc
