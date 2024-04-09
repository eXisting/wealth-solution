import { createSlice } from '@reduxjs/toolkit';

export const initialValuesSlice = createSlice({
  name: 'initialValues',
  initialState: {
    startingSavings: "5000",
    startingAge: 25,
    desiredResult: 1000000,
  },
  reducers: {
    updateStartingSavings: (state, action) => {
      state.startingSavings = action.payload;
    },
    updateStartingAge: (state, action) => {
      state.startingAge = action.payload;
    },
    updateDesiredResult: (state, action) => {
      state.desiredResult = action.payload;
    },
  },
});

export const { 
  updateStartingSavings, 
  updateStartingAge, 
  updateDesiredResult 
} = initialValuesSlice.actions;

export default initialValuesSlice.reducer;
