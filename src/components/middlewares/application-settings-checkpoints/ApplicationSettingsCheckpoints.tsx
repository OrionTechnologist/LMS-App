import React, {useEffect} from 'react';
import {useApplicationSettings} from '@/hooks/useApplicationSettings';
import MaintenanceMode from '@/components/molecules/MaintenanceMode';
import {useAppSelector} from '@/hooks';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import {
  clearGetApplicationSettingsActionResponse,
  getApplicationSettingsAction,
  handleApplicationSettingsResponse,
  updateApplicationSettings,
} from '@/redux/actions/httpActions';
import {ApplicationSettings} from '@/types';
import Toast from 'react-native-simple-toast';
import {alertMessages} from '@/config/alert-messages';
import {APP} from '@/config/app.config';
import UpdateAvailable from '@/components/molecules/UpdateAvailable';
import {useNotificationSignals} from '@/hooks/useNotificationSignals';

interface ApplicationSettingsCheckpointsProps {
  children?: React.ReactNode;
}

const ApplicationSettingsCheckpoints: React.FC<
  ApplicationSettingsCheckpointsProps
> = props => {
  const {maintenanceMode, shouldReloadSettings, appCurrentVersion} =
    useApplicationSettings();

  const applicationSettingsHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.GET_APPLICATION_SETTINGS];

  const updateAvailable =
    appCurrentVersion && APP.VERSION !== appCurrentVersion;

  const refreshSettings = () => {
    getApplicationSettingsAction();
  };

  useNotificationSignals({
    onReceiveMaintenanceNotice() {
      refreshSettings();
    },
    onReceiveVersionUpdateNotice() {
      refreshSettings();
    },
  });

  useEffect(() => {
    if (applicationSettingsHttpResponse?.success) {
      clearGetApplicationSettingsActionResponse();
      const applicationSettingsData: ApplicationSettings =
        applicationSettingsHttpResponse?.data;
      handleApplicationSettingsResponse(applicationSettingsData);
    }

    if (applicationSettingsHttpResponse?.error) {
      clearGetApplicationSettingsActionResponse();
      Toast.show(alertMessages.applicationSettingsRefreshFailed, Toast.LONG);
    }
  }, [applicationSettingsHttpResponse]);

  useEffect(() => {
    if (shouldReloadSettings) {
      updateApplicationSettings({shouldReloadSettings: false});
      refreshSettings();
    }
  }, [shouldReloadSettings]);

  const renderView = () => {
    if (maintenanceMode) {
      return (
        <MaintenanceMode
          loading={applicationSettingsHttpResponse?.loading}
          onPressRefresh={refreshSettings}
        />
      );
    }

    if (updateAvailable) {
      return <UpdateAvailable />;
    }

    return <>{props?.children}</>;
  };

  return <>{renderView()}</>;
};

export {ApplicationSettingsCheckpoints};
