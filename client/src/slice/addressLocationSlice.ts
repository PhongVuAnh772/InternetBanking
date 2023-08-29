import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store/store';
import {Reducer} from 'redux';

interface locationState {
  latitude: number,
  longtitude: number
}

const initialState: locationState = {
  latitude: 0,longtitude: 0
};

export const addressLocationSlice = createSlice({
  name: 'allToken',
  initialState,
  reducers: {
    setLatitude: (state, action: PayloadAction<number>) => {
      state.latitude = action.payload;
    },
    setLongtitude: (state, action: PayloadAction<number>) => {
      state.longtitude = action.payload;
    },
  },
});

export const {setLatitude, setLongtitude} = addressLocationSlice.actions;
// export const selectCount = (state: RootState) => state.login.loggedIn;
export default addressLocationSlice.reducer;
