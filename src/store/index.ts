import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './reducer/events';
import bandsReducer from './reducer/bands';
import decodedTokenReducer from './reducer/decodedToken';

const store = configureStore({
  reducer: {
    events: eventsReducer,
    bands: bandsReducer,
    decodedToken: decodedTokenReducer,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
