import { createSlice } from "@reduxjs/toolkit";

/**
 * @interface kanji
 * @property {string} character - selected kanji character
 * @property {string} url - link to kanji's page on wanikani
 * @property {number} level - level where kanji is introduced
 * @property {string[]} meanings - array of possible meanings
 * @property {number[]} similarIds - array of similar kanji's ids
 */
export interface kanji {
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
      character: "", // selected kanji character
      url: "",
      level: 0,
      meanings: [] as string[],
      similarIds: [] as number[],
    },
  },
  reducers: {
    setKanji: (state, action) => {
      state.kanji.character = action.payload.character;
      state.kanji.url = action.payload.url;
      state.kanji.level = action.payload.level;
      state.kanji.meanings = action.payload.meanings;
      state.kanji.similarIds = action.payload.similarIds;
    },
  },
});

export const { setKanji } = questionSlice.actions;

export default questionSlice.reducer;
// holds selected kanji, possible answers, answer, etc
