import {combineReducers} from 'redux';
import httpReducer from './http/httpSlice';
import authReducer from './authSlice';
import uiReducer from './uiSlice';
import applicationSettingsReducer from './applicationSettingsSlice';

/**
 * This is the root reducer which combines all the reducers
 * We include all the reducers here
 */
export const rootReducer = combineReducers({
  http: httpReducer,
  auth: authReducer,
  ui: uiReducer,
  applicationSettings: applicationSettingsReducer,
});
