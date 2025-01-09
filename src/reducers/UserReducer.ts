import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    apiKey: "",
  },
  reducers: {
    setApiKey: (state, action) => {
      state.apiKey = action.payload;
    },
  },
});

export const { setApiKey } = userSlice.actions;

export default userSlice.reducer;
// holds api token, user stats (accuracy, etc), user settings (theme, etc), user account info (level, etc)
