import React from 'react';
import {BinanceHorizontalImage} from '@/assets/images';
import {Image, ImageStyle} from 'react-native';

interface BinanceLogoProps {
  style?: ImageStyle;
}

const BinanceLogo: React.FC<BinanceLogoProps> = props => {
  const {style} = props;

  return (
    <>
      <Image
        source={BinanceHorizontalImage}
        className={'h-[40px] w-[50%] bg-[#222222] rounded-[8px]'}
        resizeMode={'cover'}
        style={style}
      />
    </>
  );
};

export {BinanceLogo};
