import {configureStore} from '@reduxjs/toolkit';
import loginReducer from '../src/slice/authSlice';
import networkReducer from '../src/slice/networkSlice';
import thunk from 'redux-thunk';
import transferReducer from '../src/slice/transferSlice';
import allTokenReducer from '../src/slice/allTokenSlice';
import transferInternalReducer from '../src/slice/transferInternalSlice';
import signUpReducer from '../src/slice/signUpSlice';
import creditReducer from '../src/slice/creditSlice';
import passReducer  from '../src/slice/changePassSlice';
import loanReducer from '../src/slice/loanSlice';
import addressLocationReducer from '../src/slice/addressLocationSlice';


const store = configureStore({
  reducer: {
    login: loginReducer,
    network: networkReducer,
    transfer: transferReducer,
    allToken: allTokenReducer,
    transferInternal: transferInternalReducer,
    signUp: signUpReducer,
    credit: creditReducer,
    pass: passReducer,
    loan: loanReducer,
    location: addressLocationReducer
  },
  middleware: [thunk]

});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { login: LoginState }
export type AppDispatch = typeof store.dispatch;
export default store;
