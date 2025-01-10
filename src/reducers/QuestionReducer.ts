import { createSlice } from "@reduxjs/toolkit";

/**
 * @interface kanji
 *  @property {number} id - selected kanji's id
 * @property {string} character - selected kanji character
 * @property {string} url - link to kanji's page on wanikani
 * @property {number} level - level where kanji is introduced
 * @property {string[]} meanings - array of possible meanings
 * @property {number[]} similarIds - array of similar kanji's ids
 */
export interface kanji {
  id: number;
  character: string;
  url: string;
  level: number;
  meanings: string[];
  similarIds: number[];
}

const questionSlice = createSlice({
  name: "question",
  initialState: {
    kanji: {
      id: 0,
      character: "",
      url: "",
      level: 0,
      meanings: [] as string[],
      similarIds: [] as number[],
    },
    answered: false,
    correct: null,
  },
  reducers: {
    setKanji: (state, action) => {
      state.kanji.id = action.payload.id;
      state.kanji.character = action.payload.character;
      state.kanji.url = action.payload.url;
      state.kanji.level = action.payload.level;
      state.kanji.meanings = action.payload.meanings;
      state.kanji.similarIds = action.payload.similarIds;
    },
    setAnswered: (state, action) => {
      state.answered = action.payload;
    },
    setCorrect: (state, action) => {
      state.correct = action.payload;
    },
  },
});

export const { setKanji, setAnswered, setCorrect } = questionSlice.actions;

export default questionSlice.reducer;
// holds selected kanji, possible answers, answer, etc
