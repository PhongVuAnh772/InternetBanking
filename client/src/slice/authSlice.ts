import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store/store';
import { Reducer } from 'redux';

interface LoginState {
  loggedIn: boolean;
  token: string;
}


const initialState: LoginState = {
  loggedIn: false,
  token: ''
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    setLogout: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});


export const {setLogin, setLogout,setToken} = loginSlice.actions;
// export const selectCount = (state: RootState) => state.login.loggedIn;
export default loginSlice.reducer;
