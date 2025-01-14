import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Kanji } from "./QuestionReducer";
import axios from "axios";

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
}

const initialState: UserState = {
  apiKey: "",
  level: 0,
  kanjiIds: [],
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
    // setKanjiIds: (state, action: PayloadAction<Kanji[]>) => {
    //   state.kanjiIds = action.payload;
    // },
  },
});

export const { setApiKey, setLevel } = userSlice.actions;

// export const initStudyByLevel = (
//   selectedLevels: string | null = null,
//   selectedStages: string | null = null
// ) => {
//   return async (dispatch: any, useState: any) => {
//     let url = "https://api.wanikani.com/v2/subjects?types=kanji&started=true";
//     if (selectedLevels) {
//       url += `&levels=${selectedLevels}`;
//     } else if (selectedStages) {
//       url += `&srs_stages=${selectedStages}`;
//     }

//     console.log("url", url);
//     const apiKey = useState().user.apiKey;

//     // recursively fetch all pages of kanji ids
//     const fetchIds = async (url: string | null) => {
//       if (url) {
//         await axios
//           .get(url, {
//             headers: {
//               Authorization: `Bearer ${apiKey}`,
//             },
//           })
//           .then((res) => {
//             console.log("fetched", res.data);

//             dispatch(
//               setKanjiIds(
//                 res.data.data
//                   .filter(
//                     (kanji: ReturnedKanjiData) =>
//                       kanji.data.visually_similar_subject_ids.length > 1
//                   )
//                   .map((kanji: ReturnedKanjiData) => {
//                     return {
//                       id: kanji.id,
//                       character: kanji.data.characters,
//                       url: kanji.url,
//                       level: kanji.data.level,
//                       meanings: kanji.data.meanings.map(
//                         (meaning) => meaning.meaning
//                       ),
//                       similarIds: kanji.data.visually_similar_subject_ids,
//                     };
//                   })
//               )
//             );

//             if (
//               res.data.pages.per_page > res.data.total_count &&
//               res.data.pages.next_url
//             ) {
//               console.log("fetching next page");
//               fetchIds(res.data.pages.next_url);
//             }
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       }
//     };

//     await fetchIds(url);
//   };
// };

export default userSlice.reducer;
// holds api token, user stats (accuracy, etc), user settings (theme, etc), user account info (level, etc)
