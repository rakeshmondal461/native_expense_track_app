import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./reducers/expenseReducer";

export const store = configureStore({
  reducer: {
    expense: expenseReducer,
  },
});
