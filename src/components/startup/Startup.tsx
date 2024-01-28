import React, {useEffect} from 'react';
import {ImageViewer} from '@/components/organisms/ImageViewer/ImageViewer';
import {useAppSelector} from '@/hooks';
import {selectUiState} from '@/redux/reducers/uiSlice';
import {closeImageViewerAction} from '@/redux/actions/globalActions';
import {selectAuthState} from '@/redux/reducers/authSlice';
import {
  clearGetAuthUserProfileActionResponse,
  getAuthUserProfileAction,
  storeLoginData,
} from '@/redux/actions/httpActions';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import Toast from 'react-native-simple-toast';
import {alertMessages} from '@/config/alert-messages';

const Startup = () => {
  const {imageViewer} = useAppSelector(selectUiState);
  const {shouldReloadUserData} = useAppSelector(selectAuthState);

  const getAuthUserProfileHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.GET_AUTH_USER_PROFILE];

  useEffect(() => {
    if (getAuthUserProfileHttpResponse?.success) {
      clearGetAuthUserProfileActionResponse();
      storeLoginData({userData: getAuthUserProfileHttpResponse?.data});
    }

    if (getAuthUserProfileHttpResponse?.error) {
      clearGetAuthUserProfileActionResponse();
      Toast.show(alertMessages?.getAuthUserProfileFailed, Toast.SHORT);
    }
  }, [getAuthUserProfileHttpResponse]);

  useEffect(() => {
    if (shouldReloadUserData) {
      storeLoginData({shouldReloadUserData: false});
      getAuthUserProfileAction();
    }
  }, [shouldReloadUserData]);

  return (
    <>
      <ImageViewer
        open={imageViewer?.open}
        images={imageViewer?.images}
        onClose={closeImageViewerAction}
      />
    </>
  );
};

export {Startup};
