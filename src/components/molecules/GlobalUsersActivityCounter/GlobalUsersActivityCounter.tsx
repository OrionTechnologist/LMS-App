import React from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';
// import { AlertItem } from '@/components/molecules/GlobalUsersActivityCounter/AlertItem';

const GlobalUsersActivityCounter = () => {
  /*const fadeAnim = new Animated.Value(0);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => fadeOut(), 800);
    });
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.8,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      fadeIn();
    });
  };

  useEffect(() => {
    fadeIn();
  }, []);*/

  return (
    <>
      {/*<View className={'mt-[15px]'}>
        <Animated.View style={[{opacity: fadeAnim}]}>
          <AlertItem />
        </Animated.View>
      </View>*/}

      <View
        style={{flex: 1}}
        className={
          'mb-[20px] w-full h-[72px] rounded-[10px] flex flex-row items-center'
        }>
        <WebView
          originWhitelist={['*']}
          source={{
            uri: 'file:///android_asset/global-user-activities/index.html',
          }}
          style={{flex: 1}}
          containerStyle={{
            borderRadius: 10,
            elevation: 1,
          }}
        />
      </View>
    </>
  );
};

export {GlobalUsersActivityCounter};
