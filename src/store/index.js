import { configureStore } from '@reduxjs/toolkit';
import decodedTokenReducer from './reducer/decodedToken';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, decodedTokenReducer);

const store = configureStore({
  reducer: {
    decodedToken: persistedReducer,
  },
});
const persistor = persistStore(store);

export { store, persistor };
