import React from 'react';
import {Image, View} from 'react-native';
import {Button} from '@/components/atoms/Button';
import {Text} from 'react-native-paper';
import {MaintenanceModeIcon} from '@/assets/icons';
import {useApplicationSettings} from '@/hooks/useApplicationSettings';

interface MaintenanceModeProps {
  loading?: boolean;
  onPressRefresh?(): void;
}

const MaintenanceMode: React.FC<MaintenanceModeProps> = props => {
  const {maintenanceModeMessage} = useApplicationSettings();
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
              source={MaintenanceModeIcon}
              className={'w-[100px] h-[100px] mb-[35px]'}
            />
            <Text
              className={
                'text-public-page-title text-[25px] font-[700] text-center'
              }>
              Maintenance Mode
            </Text>
            <Text
              className={
                'text-public-page-subtitle text-[16px] font-[500] mt-[15px] text-center'
              }>
              {!maintenanceModeMessage || maintenanceModeMessage?.trim() === ''
                ? 'We are under maintenance mode due to some technical problems. We will be back soon!'
                : maintenanceModeMessage}
            </Text>
          </View>

          <View className={'flex flex-col gap-[15px] mt-[32px]'}>
            <View>
              <Button
                title={'Refresh'}
                onPress={props?.onPressRefresh}
                loading={props?.loading}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default MaintenanceMode;
