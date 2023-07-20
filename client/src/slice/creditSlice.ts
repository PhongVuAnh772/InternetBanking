import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store/store';
import { Reducer } from 'redux';

interface creditState {
  UserNameCreditCard: string;
  CVVNumber: string;
  DateValue: string;
  Balance: number;
  locked: boolean;
  getPhysicalCard: boolean;
  CC_number: string;
  PINCode: string;
}


const initialState: creditState = {
  CVVNumber: '',
  UserNameCreditCard: '',
  DateValue: '',
  Balance: 0.00,
  locked: false,
  getPhysicalCard: false,
  CC_number: '',
  PINCode: ''
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
    setBalance: (state, action: PayloadAction<number>) => {
      state.Balance = action.payload;
    },
    setLocked: (state, action: PayloadAction<boolean>) => {
      state.locked = action.payload;
    },
    setgetPhysicalCard: (state, action: PayloadAction<boolean>) => {
      state.getPhysicalCard = action.payload;
    },
    setCC_number: (state, action: PayloadAction<string>) => {
      state.CC_number = action.payload;
    },
    setPINCode: (state, action: PayloadAction<string>) => {
      state.PINCode = action.payload;
    },
  },
});


export const {setCVVNumber, setDateValue,setUserNameCreditCard, setBalance,setgetPhysicalCard,setLocked,setCC_number,setPINCode} = creditSlice.actions;
// export const selectCount = (state: RootState) => state.credit.loggedIn;
export default creditSlice.reducer;
