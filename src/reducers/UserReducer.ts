import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
// holds api token, user stats (accuracy, etc), user settings (theme, etc), user account info (level, etc)
