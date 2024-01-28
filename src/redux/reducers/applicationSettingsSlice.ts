import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppState} from '@/redux/store';
import {PaymentMethodType} from '@/types/paymentMethodType';

export interface ApplicationSettingsState {
  currencyName?: string | null;
  currencySymbol?: string | null;
  websiteUrl?: string | null;
  appCurrentVersion?: string | null;
  maintenanceMode?: boolean | 0 | 1;
  maintenanceModeMessage?: string | null;
  shouldReloadSettings: boolean;
  paymentMethod: PaymentMethodType | null;
  paymentMethodAccountNo: string | null;
}

const initialState: ApplicationSettingsState = {
  currencyName: null,
  currencySymbol: null,
  websiteUrl: null,
  appCurrentVersion: null,
  maintenanceMode: false,
  maintenanceModeMessage: null,
  shouldReloadSettings: false,
  paymentMethod: null,
  paymentMethodAccountNo: null,
};

export const applicationSettingsSlice = createSlice({
  name: 'applicationSettingsStates',
  initialState,
  reducers: {
    storeApplicationSettings: (
      state,
      action: PayloadAction<Partial<ApplicationSettingsState>>,
    ) => {
      return {
        ...state,
        ...action?.payload,
      };
    },
  },
});

export const selectApplicationSettingsState = (state: AppState) =>
  state.applicationSettings;
export const {storeApplicationSettings} = applicationSettingsSlice.actions;

export default applicationSettingsSlice.reducer;
