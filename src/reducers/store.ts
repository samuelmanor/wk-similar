import { configureStore, combineReducers } from "@reduxjs/toolkit";
import QuestionReducer from "./QuestionReducer";
import UserReducer from "./UserReducer";

const reducer = combineReducers({
  user: UserReducer,
  question: QuestionReducer,
});

export default configureStore({ reducer });
