import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store/store';
import { Reducer } from 'redux';

interface creditState {
  UserNameCreditCard: string;
  CVVNumber: string;
  DateValue: string;
}


const initialState: creditState = {
  CVVNumber: '',
  UserNameCreditCard: '',
  DateValue: ''
};

export const creditSlice = createSlice({
  name: 'credit',
  initialState,
  reducers: {
    setUserNameCreditCard: (state, action: PayloadAction<string>) => {
      state.UserNameCreditCard = action.payload;
    },
    setCVVNumber: (state, action: PayloadAction<string>) => {
      state.CVVNumber = action.payload;
    },
    setDateValue: (state, action: PayloadAction<string>) => {
      state.DateValue = action.payload;
    },
  },
});


export const {setCVVNumber, setDateValue,setUserNameCreditCard} = creditSlice.actions;
// export const selectCount = (state: RootState) => state.credit.loggedIn;
export default creditSlice.reducer;
