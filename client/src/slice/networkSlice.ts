import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store/store';
import { Reducer } from 'redux';

interface NetworkState {
    ipv4Address: string | null;
  }

const NetworkInitialState: NetworkState = {
    ipv4Address: null,
  };

  export const networkSlice =  createSlice({
    name: 'network',
    initialState: NetworkInitialState,
    reducers: {
      setIPv4Address: (state, action: PayloadAction<string | null>) => {
        state.ipv4Address = action.payload;
      },
    },
  });

export const {setIPv4Address} = networkSlice.actions;
  // export const selectCount = (state: RootState) => state.login.loggedIn;
  export default networkSlice.reducer;