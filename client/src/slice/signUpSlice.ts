import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store/store';
import {Reducer} from 'redux';

interface signUpState {
  email: string;
  CMNDUser: string;
  newAccountSTK: string;
  imageFrontURL: string;
  imageBackURL: string;
  dateOfBirth: string;
  sex: string;
  personalIdNumber: string;
  regionName: string;
  fullName: string;
  
}

const initialState: signUpState = {
  email: '',
  CMNDUser: '',
  newAccountSTK: '',
  imageFrontURL: '',
  imageBackURL: '',
  dateOfBirth: '',
  sex: '',
  personalIdNumber: '',
  regionName: '',
  fullName: '',
  
};

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setCMND: (state, action: PayloadAction<string>) => {
      state.CMNDUser = action.payload;
    },
    setnewAccountSTK: (state, action: PayloadAction<string>) => {
      state.newAccountSTK = action.payload;
    },
    setimageFrontURL: (state, action: PayloadAction<string>) => {
      state.imageFrontURL = action.payload;
    },
    setimageBackURL: (state, action: PayloadAction<string>) => {
      state.imageBackURL = action.payload;
    },
    setdateOfBirth: (state, action: PayloadAction<string>) => {
      state.dateOfBirth = action.payload;
    },
    setSex: (state, action: PayloadAction<string>) => {
      state.sex = action.payload;
    },
    setdateOfIssue: (state, action: PayloadAction<string>) => {
      state.sex = action.payload;
    },
    setregionName: (state, action: PayloadAction<string>) => {
      state.regionName = action.payload;
    },
    setfullName: (state, action: PayloadAction<string>) => {
      state.fullName = action.payload;
    },
    setpersonalIdNumber : (state, action: PayloadAction<string>) => {
      state.personalIdNumber = action.payload;
    },
  },
});

export const {
  setEmail,
  setCMND,
  setnewAccountSTK,
  setimageFrontURL,
  setimageBackURL,
  setdateOfBirth,
  setSex,
  setregionName,
  setfullName,
  setpersonalIdNumber
} = signUpSlice.actions;
// export const selectCount = (state: RootState) => state.login.loggedIn;
export default signUpSlice.reducer;
