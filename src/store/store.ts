import { configureStore } from '@reduxjs/toolkit';
import dataFormReducer from './dataFormSlice';

const store = configureStore({
  reducer: {
    data: dataFormReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
