import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store/store';
import {Reducer} from 'redux';

interface tokenState {
  firebaseToken: string;
  loginToken: string;
  serverKey: string;
}

const initialState: tokenState = {
  firebaseToken: '',
  loginToken: '',
  serverKey:
    'AAAAyjzoPg0:APA91bGi1ZyiWBNpd2Z9Rh2kQT7lz393oNAjmqa_TV7MtGtsA6ko39vX9VHiwGDB1lhOc9SpHweWUXqRGWL2QeyS9l-nUUFlF7GeUR7E5XJRzNFFSfJLYscUj0QeIOwhp7ZRRFvEtEP3',
};

export const allTokenSlice = createSlice({
  name: 'allToken',
  initialState,
  reducers: {
    setfirebaseToken: (state, action: PayloadAction<string>) => {
      state.firebaseToken = action.payload;
    },
    setloginToken: (state, action: PayloadAction<string>) => {
      state.firebaseToken = action.payload;
    },
  },
});

export const {setfirebaseToken, setloginToken} = allTokenSlice.actions;
// export const selectCount = (state: RootState) => state.login.loggedIn;
export default allTokenSlice.reducer;
