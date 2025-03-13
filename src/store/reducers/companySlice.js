// src/store/reducers/companySlice.js
import { createSlice } from '@reduxjs/toolkit';
import ibmData from '../../data/ibm.json';

const initialState = {
  companyDetails: ibmData,
  incomeStatement: ibmData.IncomeStatement || [],
};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyDetails: (state, action) => {
      state.companyDetails = action.payload;
    },
    setIncomeStatement: (state, action) => {
      state.incomeStatement = action.payload;
    },
  },
});

export const { setCompanyDetails, setIncomeStatement } = companySlice.actions;

export default companySlice.reducer;