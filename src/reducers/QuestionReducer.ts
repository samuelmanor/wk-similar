import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { addMistake } from "./UserReducer";

interface KanjiSubjectData {
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

interface KanjiAssignmentData {
  data: {
    available_at: string | null;
    burned_at: string | null;
    created_at: string;
    hidden: boolean;
    passed_at: string | null;
    resurrected_at: string | null;
    srs_stage: number;
    started_at: string;
    subject_id: number;
    subject_type: string;
    unlocked_at: string | null;
  };
  data_updated_at: string;
  id: number;
  object: "assignment";
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
  currentKanji: Kanji;
  currentSimilarKanji: Kanji[];
  answered: boolean;
  correct: boolean | null;
  validKanji: Kanji[] | number[]; // kanji[] if level mode, number[] if srs mode
  error: string | null;
}

const initialState: QuestionState = {
  currentKanji: {
    id: 0,
    character: "",
    url: "",
    level: 0,
    meanings: [],
    similarIds: [],
  },
  currentSimilarKanji: [],
  answered: false,
  correct: null,
  validKanji: [],
  error: null,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setCurrentKanji: (state, action) => {
      // remove previous currentKanji from validKanji, if it exists
      if (state.validKanji.length > 0) {
        state.validKanji = state.validKanji.slice(1);
      }

      state.currentKanji = action.payload;
    },
    setSimilarKanji: (state, action) => {
      state.currentSimilarKanji = action.payload;
    },
    setAnswered: (state, action) => {
      state.answered = action.payload;
    },
    setCorrect: (state, action) => {
      state.correct = action.payload;
    },
    setValidKanji: (state, action) => {
      state.validKanji = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentKanji,
  setSimilarKanji,
  setAnswered,
  setCorrect,
  setValidKanji,
  setError,
} = questionSlice.actions;

/**
 * Fetches similar kanji for the current kanji
 * @param similarIds - The ids of the similar kanji
 */
export const getSimilarKanji = (similarIds: number[]) => {
  return async (dispatch: any, useState: any) => {
    const apiKey = useState().user.apiKey;
    let ids = [...similarIds];

    // if more than 3 similar kanji, pick 3 random ones
    if (ids.length > 3) {
      ids.sort(() => Math.random() - 0.5); // randomize array
      ids = ids.slice(0, 3); // take first 3 elements
    }

    let kanjiOptions = [useState().question.currentKanji];

    const getSimilarKanji = async (id: number, index: number) => {
      await axios
        .get(`https://api.wanikani.com/v2/subjects/${id}`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        })
        .then((res) => {
          // console.log(res.data, index);
          const kanji = {
            id: res.data.id,
            character: res.data.data.characters,
            url: res.data.data.document_url,
            level: res.data.data.level,
            meanings: res.data.data.meanings.map(
              (meaning: { meaning: string }) => meaning.meaning
            ),
            similarIds: res.data.data.visually_similar_subject_ids,
          };

          kanjiOptions = [...kanjiOptions, kanji];
        });
    };

    // get similar kanji for each id
    for (let i = 0; i < ids.length; i++) {
      await getSimilarKanji(ids[i], i);
    }

    // randomize kanjiOptions
    kanjiOptions = kanjiOptions.sort(() => Math.random() - 0.5);

    dispatch(setSimilarKanji(kanjiOptions));
  };
};

/**
 * Picks a kanji from the validKanji list and fetches similar kanji
 */
export const pickKanji = () => {
  return async (dispatch: any, useState: any) => {
    console.log("kanji being picked...");
    const validKanji = useState().question.validKanji;
    const apiKey = useState().user.apiKey;

    if (validKanji.length === 0) {
      console.log("no kanji left");
      dispatch(setError("no kanji left!"));
      return;
    }

    if (typeof validKanji[0] === "object") {
      // console.log("level");
      dispatch(setCurrentKanji(validKanji[0]));
      dispatch(getSimilarKanji(validKanji[0].similarIds));
      dispatch(setValidKanji(validKanji.slice(1)));
    } else if (typeof validKanji[0] === "number") {
      // console.log("srs");
      let currentIndex = 0;

      const fetchKanji = async (index: number) => {
        await axios
          .get(`https://api.wanikani.com/v2/subjects/${validKanji[index]}`, {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.data.visually_similar_subject_ids.length > 1) {
              // console.log("valid");
              // update validKanji to remove all kanji previous to current kanji
              dispatch(setValidKanji(validKanji.slice(index + 1)));

              dispatch(
                setCurrentKanji({
                  id: res.data.id,
                  character: res.data.data.characters,
                  url: res.data.data.document_url,
                  level: res.data.data.level,
                  meanings: res.data.data.meanings.map(
                    (meaning: { meaning: string }) => meaning.meaning
                  ),
                  similarIds: res.data.data.visually_similar_subject_ids,
                })
              );

              dispatch(
                getSimilarKanji(res.data.data.visually_similar_subject_ids)
              );
            } else {
              // console.log("invalid");
              currentIndex += 1;
              fetchKanji(currentIndex);
            }
          })
          .catch((err) => {
            console.log(err);

            if (err.response.status === 429) {
              console.log(err.response.data.error);
              dispatch(setError("rate limited"));
            }
          });
      };

      fetchKanji(currentIndex);
    }
  };
};

/**
 * Checks if the selected kanji is the correct answer
 */
export const answerQuestion = (selectedKanji: Kanji) => {
  return async (dispatch: any, useState: any) => {
    const answer = useState().question.currentKanji;

    dispatch(setAnswered(true));

    if (selectedKanji.id === answer.id) {
      dispatch(setCorrect(true));
    } else {
      dispatch(setCorrect(false));
      dispatch(addMistake(answer));
    }
  };
};

/**
 * Resets the question state and picks a new kanji
 */
export const nextQuestion = () => {
  return async (dispatch: any) => {
    // console.log("next question 2");
    dispatch(setAnswered(false));
    dispatch(setCorrect(null));
    dispatch(pickKanji());
  };
};

/**
 * Initializes the study session by fetching kanji by level
 * @param selectedLevels - The levels to fetch kanji from
 */
export const initStudyByLevel = (selectedLevels: string) => {
  return async (dispatch: any, useState: any) => {
    const apiKey = useState().user.apiKey;
    let validKanji: Kanji[] = [];

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
            // console.log("fetched:", res.data);
            validKanji = validKanji.concat(
              res.data.data
                .filter(
                  (kanji: KanjiSubjectData) =>
                    kanji.data.visually_similar_subject_ids.length > 1
                )
                .map((kanji: KanjiSubjectData) => {
                  return {
                    id: kanji.id,
                    character: kanji.data.characters,
                    url: kanji.data.document_url,
                    level: kanji.data.level,
                    meanings: kanji.data.meanings.map(
                      (meaning) => meaning.meaning
                    ),
                    similarIds: kanji.data.visually_similar_subject_ids,
                  };
                })
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
            if (err.response.stats === 429) {
              console.log(err.response.data.error);
              dispatch(setError("rate limited"));
            }
          });
      }
    };

    await fetchIds(
      `https://api.wanikani.com/v2/subjects?types=kanji&started=true&levels=${selectedLevels}`
    );

    // randomize validKanji
    validKanji = validKanji.sort(() => Math.random() - 0.5);
    dispatch(setValidKanji(validKanji));

    dispatch(pickKanji());
  };
};

/**
 * Initializes the study session by fetching kanji by srs stage
 * @param selectedStage - The srs stage to fetch kanji from
 */
export const initStudyBySrs = (selectedStage: string) => {
  return async (dispatch: any, useState: any) => {
    const apiKey = useState().user.apiKey;
    let validKanji: number[] = [];

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
            // console.log("fetched:", res.data);

            validKanji = [
              ...validKanji,
              ...res.data.data
                .filter(
                  (kanji: KanjiAssignmentData) =>
                    kanji.data.subject_type === "kanji"
                )
                .map((kanji: KanjiAssignmentData) => kanji.data.subject_id),
            ];

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
            if (err.response.stats === 429) {
              console.log(err.response.data.error);
              dispatch(setError("rate limited"));
            }
          });
      }
    };
    await fetchIds(
      `https://api.wanikani.com/v2/assignments?srs_stages=${selectedStage}`
    );

    // randomize validKanji
    validKanji = validKanji.sort(() => Math.random() - 0.5);
    dispatch(setValidKanji(validKanji));

    dispatch(pickKanji());
  };
};

export default questionSlice.reducer;
// holds selected kanji, possible answers, answer, etc
