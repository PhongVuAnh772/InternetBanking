import {createSlice, PayloadAction, Slice} from '@reduxjs/toolkit';
import {RootState} from '../../store/store';

interface TransferState {
  cardNumberInternal: string;
  NameOfCardNumberInternal: string;
  BankValueMoneyInternal: number;
  messageTransferInternal: string;
  timeTransferBankInternal: string;
}

const transferInitialState: TransferState = {
  cardNumberInternal: '',
  BankValueMoneyInternal: 0,
  messageTransferInternal: '',
  NameOfCardNumberInternal: '',
  timeTransferBankInternal: '',
};

const transferSlice: Slice<TransferState> = createSlice({
  name: 'transfer',
  initialState: transferInitialState,
  reducers: { 
    settimeTransferBankInternal: (state, action: PayloadAction<string>) => {
      state.timeTransferBankInternal = action.payload;
    },  
    setNameOfCardNumberInternal: (state, action: PayloadAction<string>) => {
      state.NameOfCardNumberInternal = action.payload;
    },
    setBankValueMoneyInternal: (state, action: PayloadAction<number>) => {
      state.BankValueMoneyInternal = action.payload;
    },
    setmessageTransferInternal: (state, action: PayloadAction<string>) => {
      state.messageTransferInternal = action.payload;
    },
    setcardNumberInternal: (state, action: PayloadAction<string>) => {
      state.cardNumberInternal = action.payload;
    },
  },
});

export const {
  setNameOfCardNumberInternal,
  setcardNumberInternal,
  setBankValueMoneyInternal,
  setmessageTransferInternal,
  settimeTransferBankInternal
} = transferSlice.actions;
// export const selectBankChoosing = (state: RootState) => state.transfer.BankChoosing;

export default transferSlice.reducer;
