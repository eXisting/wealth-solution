import { createSlice } from '@reduxjs/toolkit';

export const graphSlice = createSlice({
  name: 'graph',
  initialState: {
    monthlySavings: 100,
    yearsInterval: 40,
    totalSavings: 0,
  },
  reducers: {
    updateTotalSavings: (state, action) => {
      state.totalSavings = action.payload;
    },
    updateMonthlySavings: (state, action) => {
      state.monthlySavings = action.payload;
    },
  },
});

export const {
  updateTotalSavings,
  updateMonthlySavings,
} = graphSlice.actions;

export default graphSlice.reducer;