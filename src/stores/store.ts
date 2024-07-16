import {configureStore} from '@reduxjs/toolkit';
import {reelReducer} from './reel/reelReducer.ts';

export const store = configureStore({
  reducer: {
    reels: reelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
