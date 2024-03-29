import {createSlice, PayloadAction, Slice} from '@reduxjs/toolkit';
import {RootState} from '../../store/store';

interface TransferState { 
  STKBankChoosingInternal: string;
  NameOfSTKBankChoosingInternal: string;
  BankValueMoneyInternal: number;
  messageTransferInternal: string;
  timeTransferBankInternal: string;
}

const transferInitialState: TransferState = {
  STKBankChoosingInternal: '',
  BankValueMoneyInternal: 0,
  messageTransferInternal: '',
  NameOfSTKBankChoosingInternal: '',
  timeTransferBankInternal: '',
};

const transferSlice: Slice<TransferState> = createSlice({
  name: 'transfer',
  initialState: transferInitialState,
  reducers: { 
    settimeTransferBankInternal: (state, action: PayloadAction<string>) => {
      state.timeTransferBankInternal = action.payload;
    },  
    setNameOfSTKBankChoosingInternal: (state, action: PayloadAction<string>) => {
      state.NameOfSTKBankChoosingInternal = action.payload;
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
  },
});

export const {
  setNameOfSTKBankChoosingInternal,
  setSTKBankChoosingInternal,
  setBankValueMoneyInternal,
  setmessageTransferInternal,
  settimeTransferBankInternal
} = transferSlice.actions;
// export const selectBankChoosing = (state: RootState) => state.transfer.BankChoosing;

export default transferSlice.reducer;
