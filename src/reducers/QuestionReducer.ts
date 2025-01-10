import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    kanji: {
      character: "", // selected kanji character
      url: "", // link to kanji's page on wanikani
      level: 0, // level where kanji is introduced
      meanings: [] as string[], // array of possible meanings
      similarIds: [] as number[], // array of similar kanji ids
    },
  },
  reducers: {
    setKanji: (state, action) => {
      state.kanji = action.payload;
    },
  },
});

export const { setKanji } = questionSlice.actions;

export default questionSlice.reducer;
// holds selected kanji, possible answers, answer, etc
