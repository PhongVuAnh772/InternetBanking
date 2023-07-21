import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store/store';
import { Reducer } from 'redux';

interface passState {

  AccountChangePass: string;
}


const initialState: passState = {

  AccountChangePass: ''
};

export const passSlice = createSlice({
  name: 'pass',
  initialState,
  reducers: {
    setAccountChangePass: (state, action: PayloadAction<string>) => {
      state.AccountChangePass = action.payload;
    },
    
  },
});


export const {setAccountChangePass} = passSlice.actions;
// export const selectCount = (state: RootState) => state.login.loggedIn;
export default passSlice.reducer;
