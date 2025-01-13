import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    apiKey: "",
    level: 0,
    kanjiIds: [],
  },
  reducers: {
    setApiKey: (state, action) => {
      state.apiKey = action.payload;
    },
    setLevel: (state, action) => {
      state.level = action.payload;
    },
  },
});

export const { setApiKey, setLevel } = userSlice.actions;

export default userSlice.reducer;
// holds api token, user stats (accuracy, etc), user settings (theme, etc), user account info (level, etc)
