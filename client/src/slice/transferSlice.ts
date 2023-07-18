import {createSlice, PayloadAction, Slice} from '@reduxjs/toolkit';
import {RootState} from '../../store/store';

interface TransferState {
  BankChoosing: string;
  BankChoosingIcon: string;
  STKBankChoosing: string;
  NameOfSTKBankChoosing: string;
  BankValueMoney: number;
  messageTransfer: string;
  binBankChoosing: string;
  longNameBankChoosing: string;
  timeTransferBank: string;
}

const transferInitialState: TransferState = {
  BankChoosing: '',
  BankChoosingIcon: '',
  STKBankChoosing: '',
  BankValueMoney: 0,
  messageTransfer: '',
  binBankChoosing: '',
  longNameBankChoosing: '',
  NameOfSTKBankChoosing: '',
  timeTransferBank: '',
};

const transferSlice: Slice<TransferState> = createSlice({
  name: 'transfer',
  initialState: transferInitialState,
  reducers: {
    setBankChoosing: (state, action: PayloadAction<string>) => {
      state.BankChoosing = action.payload;
    },
    settimeTransferBank: (state, action: PayloadAction<string>) => {
      state.timeTransferBank = action.payload;
    },
    setbinBankChoosing: (state, action: PayloadAction<string>) => {
      state.binBankChoosing = action.payload;
    },

    setNameOfSTKBankChoosing: (state, action: PayloadAction<string>) => {
      state.NameOfSTKBankChoosing = action.payload;
    },
    setBankChoosingIcon: (state, action: PayloadAction<string>) => {
      state.BankChoosingIcon = action.payload;
    },
    setSTKBankChoosing: (state, action: PayloadAction<string>) => {
      state.STKBankChoosing = action.payload;
    },
    setBankValueMoney: (state, action: PayloadAction<number>) => {
      state.BankValueMoney = action.payload;
    },
    setmessageTransfer: (state, action: PayloadAction<string>) => {
      state.messageTransfer = action.payload;
    },
    setlongNameBankChoosing: (state, action: PayloadAction<string>) => {
      state.longNameBankChoosing = action.payload;
    },
  },
});

export const {
  setlongNameBankChoosing,
  setbinBankChoosing,
  setBankChoosing,
  setBankChoosingIcon,
  setNameOfSTKBankChoosing,
  setSTKBankChoosing,
  setBankValueMoney,
  setmessageTransfer,
  settimeTransferBank
} = transferSlice.actions;
// export const selectBankChoosing = (state: RootState) => state.transfer.BankChoosing;

export default transferSlice.reducer;
