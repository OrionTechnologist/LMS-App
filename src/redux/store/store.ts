import {rootReducer} from '@/redux/reducers';
import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';

/**
 * Prepare the store
 */
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger);
  },
  devTools: true,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
