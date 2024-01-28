import React from 'react';
import {Provider} from 'react-redux';
import {PaperProvider} from 'react-native-paper';
import {Router} from '@/routes';
import {store} from '@/redux/store';
import {ReduxService} from '@/redux/services';
import {PermissionsChecker, Startup} from '@/components/startup';
import {ApplicationSettingsCheckpoints} from '@/components/middlewares/application-settings-checkpoints';

const App = () => {
  return (
    <>
      <PermissionsChecker />
      <PaperProvider>
        <Provider store={store}>
          <ReduxService>
            {/*<BackgroundServices />*/}
            <Startup />
            <ApplicationSettingsCheckpoints>
              <Router />
            </ApplicationSettingsCheckpoints>
          </ReduxService>
        </Provider>
      </PaperProvider>
    </>
  );
};

export default App;
