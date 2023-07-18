import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

interface OtherBank {
  nameOtherBank: string;
  iconOtherBank: Uint8Array;
}

interface FetchOtherBankResponse {
  nameOtherBank: string;
  iconOtherBank: Uint8Array;
}

const initialState: OtherBank = {
  nameOtherBank: "",
  iconOtherBank: new Uint8Array(),
};

export const fetchOtherBank = createAsyncThunk(
  'otherBank/fetchOtherBank',
  async () => {
    const response = await fetch("http://localhost:5000/api/getDataOtherBanks");
    const data: FetchOtherBankResponse = await response.json();
    return data;
  }
);

const otherBankSlice = createSlice({
  name: 'otherBank',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOtherBank.fulfilled, (state, action) => {
      state.nameOtherBank = action.payload.nameOtherBank;
      state.iconOtherBank = action.payload.iconOtherBank;
    });
  }
});

export default otherBankSlice.reducer;
