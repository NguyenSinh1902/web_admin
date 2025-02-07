import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';

// Create Redux store
const store = configureStore({
  reducer: reducer
});

export default store;