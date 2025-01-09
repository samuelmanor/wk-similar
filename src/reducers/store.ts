import { configureStore, combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
  user: () => ({}), // holds api token, user stats (accuracy, etc), user settings (theme, etc), user account info (level, etc)
  question: () => ({}), // holds selected kanji, possible answers, answer, etc
});

export default configureStore({ reducer });
