import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store/store';
import { Reducer } from 'redux';

interface loanState {

  loanTotal: number;
  loanRepaidTotal: number;
}


const initialState: loanState = {

  loanTotal: 0,
  loanRepaidTotal: 0,
};

export const loanSlice = createSlice({
  name: 'loan',
  initialState,
  reducers: {
    setLoanTotal: (state, action: PayloadAction<number>) => {
      state.loanTotal = action.payload;
    },
    setLoanRepaidTotal: (state, action: PayloadAction<number>) => {
      state.loanRepaidTotal = action.payload;
    },
  },
});


export const {setLoanTotal,setLoanRepaidTotal} = loanSlice.actions;
// export const selectCount = (state: RootState) => state.login.loggedIn;
export default loanSlice.reducer;
