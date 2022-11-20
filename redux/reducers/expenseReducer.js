import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenseList: [],
};

export const expenseReducer = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateExpenseList: (state, action) => {
      state.expenseList = action.payload.reverse();
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateExpenseList } = expenseReducer.actions;

export default expenseReducer.reducer;
