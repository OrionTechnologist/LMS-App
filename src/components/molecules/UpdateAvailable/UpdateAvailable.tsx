import React from 'react';
import {Alert, Image, Linking, View} from 'react-native';
import {Button} from '@/components/atoms/Button';
import {Text} from 'react-native-paper';
import {UpdateAvailableRocketIcon} from '@/assets/icons';
import {useApplicationSettings} from '@/hooks/useApplicationSettings';

interface UpdateAvailableProps {}

const UpdateAvailable: React.FC<UpdateAvailableProps> = () => {
  const {websiteUrl, appCurrentVersion} = useApplicationSettings();

  const handlePressDownload = () => {
    if (websiteUrl) {
      Linking.openURL(websiteUrl).catch(() => {
        Alert.alert('Failed to open link!');
      });
    }
  };

  return (
    <>
      <View
        className={
          'bg-white flex flex-col flex-grow p-[18px] justify-center content-center items-center'
        }>
        <View className={'flex'}>
          <View
            className={'px-[40px] flex flex-col justify-center items-center'}>
            <Image
              source={UpdateAvailableRocketIcon}
              className={'w-[100px] h-[100px] mb-[35px]'}
            />
            <Text
              className={
                'text-public-page-title text-[25px] font-[700] text-center'
              }>
              Update required
            </Text>
            <Text
              className={
                'text-public-page-subtitle text-[16px] font-[500] mt-[15px] text-center'
              }>
              A newer version of the app is available for download. Please
              update to continue using the app.
            </Text>
          </View>

          {websiteUrl && (
            <View className={'flex flex-col gap-[15px] mt-[32px]'}>
              <View>
                <Button title={'Download'} onPress={handlePressDownload} />
              </View>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default UpdateAvailable;
