import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppState} from '@/redux/store';
import {UserData} from '@/types';

export interface AuthState {
  loggedIn: boolean;
  token: string | null;
  userData: UserData | null;
  shouldReloadUserData: boolean;
}

const initialState: AuthState = {
  loggedIn: false,
  token: null,
  userData: null,
  shouldReloadUserData: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeAuth: (state, action: PayloadAction<Partial<AuthState>>) => {
      return {
        ...state,
        ...action?.payload,
      };
    },
    clearAuth: () => {
      return {
        ...initialState,
      };
    },

    shouldReloadUserData: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        shouldReloadUserData: action?.payload,
      };
    },
  },
});

export const selectAuthState = (state: AppState) => state.auth;
export const {storeAuth, clearAuth, shouldReloadUserData} = authSlice.actions;

export default authSlice.reducer;
