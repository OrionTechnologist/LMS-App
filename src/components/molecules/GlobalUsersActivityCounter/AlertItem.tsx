import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import {Image, Text, View} from 'react-native';
import {
  PackageDiamondTrophyIcon,
  PackageGoldTrophyIcon,
  PackageSilverTrophyIcon,
  DemoCounterWelcomeIcon,
} from '@/assets/icons';
import {CounterAlert, getNewAlert} from '@/data/demoCounter';

interface AlertItemProps {}

const AlertItem: React.FC<AlertItemProps> = () => {
  const [activeAlertData, setActiveAlertData] = useState<CounterAlert>(
    getNewAlert(),
  );

  const {type, message} = activeAlertData;

  useEffect(() => {
    const getRandomInterval = () => {
      return Math.floor(Math.random() * 1000) + 1000;
    };

    const alertInterval = setInterval(() => {
      const alertData = getNewAlert();
      setActiveAlertData(() => alertData);
    }, getRandomInterval());

    return () => {
      clearInterval(alertInterval);
    };
  }, []);

  return (
    <>
      <View
        className={classNames(
          'px-[20px] w-full h-[60px] rounded-[8px] flex flex-row items-center',
          {
            'bg-[#009688]':
              type === 'package-purchase-silver' ||
              type === 'package-purchase-gold' ||
              type === 'package-purchase-diamond',
            'bg-primary': type === 'joining',
          },
        )}>
        {type === 'joining' && (
          <Image
            source={DemoCounterWelcomeIcon}
            className={'w-[25px] h-[25px]'}
          />
        )}

        {type === 'package-purchase-silver' && (
          <Image
            source={PackageSilverTrophyIcon}
            className={'w-[25px] h-[25px]'}
          />
        )}

        {type === 'package-purchase-gold' && (
          <Image
            source={PackageGoldTrophyIcon}
            className={'w-[25px] h-[25px]'}
          />
        )}

        {type === 'package-purchase-diamond' && (
          <Image
            source={PackageDiamondTrophyIcon}
            className={'w-[25px] h-[25px]'}
          />
        )}
        <Text
          className={
            'text-[14px] text-[#ffffff] font-bold font-poppins-medium ml-[10px] w-[90%]'
          }>
          {message}
        </Text>
      </View>
    </>
  );
};

export {AlertItem};
