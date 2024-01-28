import React from 'react';
import {StatusBar as ReactNativeStatusBar} from 'react-native';
import {colors} from '@/config/colors';

interface StatusBarProps {
  bgColor?: 'primary';
}

const StatusBar: React.FC<StatusBarProps> = props => {
  const getBgColor = () => {
    let color = 'transparent';

    if (props?.bgColor === 'primary') {
      color = colors.primary;
    }
    return color;
  };

  const bgColor = getBgColor();

  return (
    <>
      <ReactNativeStatusBar
        backgroundColor={bgColor}
        barStyle="light-content"
      />
    </>
  );
};

export {StatusBar};
