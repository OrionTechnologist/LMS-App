import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {BackArrowIcon} from '@/assets/icons';
import classNames from 'classnames';

interface BackArrowIconButtonProps {
  bgColor?: 'white' | 'transparent';
  onPress?(): void;
}

const BackArrowIconButton: React.FC<BackArrowIconButtonProps> = props => {
  const {bgColor = 'transparent', onPress} = props;
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className={classNames(
          'border border-[#cccccc] w-[41px] h-[41px] flex justify-center items-center rounded-[12px]',
          {
            'bg-white': bgColor === 'white',
          },
        )}>
        <Image source={BackArrowIcon} className={'w-[19px] h-[19px]'} />
      </TouchableOpacity>
    </>
  );
};

export {BackArrowIconButton};
