import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Kanji } from "./QuestionReducer";
import { AppDispatch } from "./store";

// interface ReturnedKanjiData {
//   data: {
//     amalgamation_subject_ids: number[];
//     auxiliary_meanings: [
//       {
//         meaning: string;
//         type: string;
//       }
//     ];
//     characters: string;
//     component_subject_ids: number[];
//     created_at: string | null;
//     document_url: string;
//     hidden_at: string | null;
//     lesson_position: number;
//     level: number;
//     meaning_hint: string;
//     meaning_mnemonic: string;
//     meanings: [
//       {
//         meaning: string;
//         primary: boolean;
//         accepted_answer: boolean;
//       }
//     ];
//     reading_hint: string;
//     reading_mnemonic: string;
//     readings: [
//       {
//         reading: string;
//         primary: boolean;
//         accepted_answer: boolean;
//         type: string;
//       }
//     ];
//     slug: string;
//     visually_similar_subject_ids: number[];
//   };
//   data_updated_at: string;
//   id: number;
//   object: "kanji";
//   url: string;
// }

interface UserState {
  apiKey: string;
  level: number;
  kanjiIds: Kanji[];
  mistakes: Kanji[];
}

const initialState: UserState = {
  apiKey: "",
  level: 0,
  kanjiIds: [],
  mistakes: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setApiKey: (state, action: PayloadAction<string>) => {
      state.apiKey = action.payload;
    },
    setLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
    setMistakes: (state, action: PayloadAction<Kanji[]>) => {
      state.mistakes = action.payload;
    },
  },
});

export const { setApiKey, setLevel, setMistakes } = userSlice.actions;

export const addMistake = (answer: Kanji) => {
  return async (dispatch: AppDispatch, useState: any) => {
    dispatch(setMistakes([...useState().user.mistakes, answer]));
  };
};

export default userSlice.reducer;
// holds api token, user stats (accuracy, etc), user settings (theme, etc), user account info (level, etc)
