import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '../features/user/userSlice';
import mailSlice from '../features/user/mailSlice';

const persistConfig = {
  key:'root',
  version:1,
  storage
}

const reducer = combineReducers({
  user:userSlice,
  composemail:mailSlice
})

const persistedReducer = persistReducer(persistConfig,reducer)

export const store = configureStore({
  reducer: persistedReducer
});
