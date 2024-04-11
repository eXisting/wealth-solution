import { createSlice } from '@reduxjs/toolkit';

const decadeTwoSlice = createSlice({
  name: 'decadeTwo',
  initialState: {
    capital: 0,
    age: 1,
    decadeIncome: '110000',
    monthlyContribution: 0,
    savingsPercentage: 15,
    totalDecadeSavings: 0,
    enabled: true,
  },
  reducers: {
    updateCapital: (state, action) => {
      state.capital = action.payload;
    },
    updateAge: (state, action) => {
      state.age = action.payload;
    },
    updateDecadeIncome: (state, action) => {
      state.decadeIncome = action.payload;
    },
    updateMonthlyContribution: (state, action) => {
      state.monthlyContribution = action.payload;
    },
    updateTotalDecadeSavings: (state, action) => {
      state.totalDecadeSavings = action.payload;
    },
    updatePercents: (state, action) => {
      state.savingsPercentage = action.payload;
    },
    updateEnabled: (state, action) => {
      state.enabled = action.payload;
    }
  },
});

export const {
  updateCapital,
  updateAge,
  updateDecadeIncome,
  updatePercents,
  updateMonthlyContribution,
  updateTotalDecadeSavings,
  updateEnabled,
} = decadeTwoSlice.actions;

export default decadeTwoSlice.reducer;
