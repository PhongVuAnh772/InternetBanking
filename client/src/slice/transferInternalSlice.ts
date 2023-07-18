import {createSlice, PayloadAction, Slice} from '@reduxjs/toolkit';
import {RootState} from '../../store/store';

interface TransferState {
  BankChoosingInternal: string;
  BankChoosingIconInternal: string;
  STKBankChoosingInternal: string;
  NameOfSTKBankChoosingInternal: string;
  BankValueMoneyInternal: number;
  messageTransferInternal: string;
  binBankChoosingInternal: string;
  longNameBankChoosingInternal: string;
  timeTransferBankInternal: string;
}

const transferInitialState: TransferState = {
  BankChoosingInternal: '',
  BankChoosingIconInternal: '',
  STKBankChoosingInternal: '',
  BankValueMoneyInternal: 0,
  messageTransferInternal: '',
  binBankChoosingInternal: '',
  longNameBankChoosingInternal: '',
  NameOfSTKBankChoosingInternal: '',
  timeTransferBankInternal: '',
};

const transferSlice: Slice<TransferState> = createSlice({
  name: 'transfer',
  initialState: transferInitialState,
  reducers: {
    setBankChoosingInternal: (state, action: PayloadAction<string>) => {
      state.BankChoosingInternal = action.payload;
    },
    settimeTransferBankInternal: (state, action: PayloadAction<string>) => {
      state.timeTransferBankInternal = action.payload;
    },
    setbinBankChoosingInternal: (state, action: PayloadAction<string>) => {
      state.binBankChoosingInternal = action.payload;
    },

    setNameOfSTKBankChoosingInternal: (state, action: PayloadAction<string>) => {
      state.NameOfSTKBankChoosingInternal = action.payload;
    },
    setBankChoosingIconInternal: (state, action: PayloadAction<string>) => {
      state.BankChoosingIconInternal = action.payload;
    },
    setSTKBankChoosingInternal: (state, action: PayloadAction<string>) => {
      state.STKBankChoosingInternal = action.payload;
    },
    setBankValueMoneyInternal: (state, action: PayloadAction<number>) => {
      state.BankValueMoneyInternal = action.payload;
    },
    setmessageTransferInternal: (state, action: PayloadAction<string>) => {
      state.messageTransferInternal = action.payload;
    },
    setlongNameBankChoosingInternal: (state, action: PayloadAction<string>) => {
      state.longNameBankChoosingInternal = action.payload;
    },
  },
});

export const {
  setlongNameBankChoosingInternal,
  setbinBankChoosingInternal,
  setBankChoosingInternal,
  setBankChoosingIconInternal,
  setNameOfSTKBankChoosingInternal,
  setSTKBankChoosingInternal,
  setBankValueMoneyInternal,
  setmessageTransferInternal,
  settimeTransferBankInternal
} = transferSlice.actions;
// export const selectBankChoosing = (state: RootState) => state.transfer.BankChoosing;

export default transferSlice.reducer;
