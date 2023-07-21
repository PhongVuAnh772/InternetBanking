import {configureStore} from '@reduxjs/toolkit';
import loginReducer from '../src/slice/authSlice';
import networkReducer from '../src/slice/networkSlice';
import thunk from 'redux-thunk';
import transferReducer from '../src/slice/transferSlice';
import allTokenReducer from '../src/slice/allTokenSlice';
import transferInternalReducer from '../src/slice/transferInternalSlice';
import signUpSlice from '../src/slice/signUpSlice';
import creditSlice from '../src/slice/creditSlice';
import passSlice  from '../src/slice/changePassSlice';




const store = configureStore({
  reducer: {
    login: loginReducer,
    network: networkReducer,
    transfer: transferReducer,
    allToken: allTokenReducer,
    transferInternal: transferInternalReducer,
    signUp: signUpSlice,
    credit: creditSlice,
    pass: passSlice
  },
  middleware: [thunk]

});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { login: LoginState }
export type AppDispatch = typeof store.dispatch;
export default store;
