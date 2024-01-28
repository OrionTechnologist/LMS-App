import React from 'react';
import {Text, View} from 'react-native';

export interface TitleContainerProps {
  title?: string | null;
  subTitle?: string | null;
}

const TitleContainer: React.FC<TitleContainerProps> = props => {
  const {title, subTitle} = props;
  return (
    <>
      <View
        className={
          'flex flex-col gap-[5px] flex-grow justify-center items-center'
        }>
        {title && (
          <Text className={'font-poppins-medium text-[20px] text-white'}>
            {title}
          </Text>
        )}

        {subTitle && (
          <Text className={'font-poppins-regular text-[13px] text-white'}>
            {subTitle}
          </Text>
        )}
      </View>
    </>
  );
};

export {TitleContainer};
