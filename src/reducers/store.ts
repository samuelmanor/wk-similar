import { configureStore, combineReducers } from "@reduxjs/toolkit";
import QuestionReducer from "./QuestionReducer";
import UserReducer from "./UserReducer";

// const reducer = combineReducers({
//   user: UserReducer,
//   question: QuestionReducer,
// });

// export default configureStore({ reducer });

export const store = configureStore({
  reducer: {
    user: UserReducer,
    question: QuestionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
