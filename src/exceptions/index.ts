import {AxiosError} from 'axios';
import {AuthService} from '@/services';
import {
  storeLoginData,
  updateApplicationSettings,
} from '@/redux/actions/httpActions';
import Toast from 'react-native-simple-toast';
import {alertMessages} from '@/config/alert-messages';

export const handleUnauthorizedError = async (e?: AxiosError) => {
  Toast.show(alertMessages.axiosSessionExpired, Toast.LONG);
  await new AuthService().removeToken();
  await storeLoginData({
    token: null,
    loggedIn: false,
    userData: null,
    shouldReloadUserData: false,
  });
};

export const handleServiceUnavailableError = async (e?: AxiosError) => {
  Toast.show(alertMessages.applicationServiceUnavailable, Toast.LONG);
  updateApplicationSettings({shouldReloadSettings: true});
};
