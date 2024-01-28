import React from 'react';
import classNames from 'classnames';
import {Badge} from 'react-native-paper';
import {Image, TouchableOpacity} from 'react-native';
import {convertToNumber} from '@/utils';

interface TabMenuButtonProps {
  active?: boolean;
  badgeContent?: number;
  onPress?(): void;
  iconSource?: any;
}

const TabMenuButton: React.FC<TabMenuButtonProps> = props => {
  const {active, badgeContent, iconSource, onPress} = props;
  return (
    <>
      <TouchableOpacity
        className={classNames(
          'relative w-[43px] h-[43px] flex items-center justify-center rounded-[14px]',
          {
            'bg-[#efe9fb]': active,
          },
        )}
        activeOpacity={0.6}
        onPress={onPress}>
        {convertToNumber(badgeContent) > 0 && (
          <Badge
            className={'absolute top-[-2px] right-[-2px]'}
            style={{
              color: 'white',
              backgroundColor: '#ff1b1b',
              fontWeight: 'bold',
            }}
            size={17}>
            {convertToNumber(badgeContent)}
          </Badge>
        )}
        <Image source={iconSource} className={'w-[14px] h-[16px]'} />
      </TouchableOpacity>
    </>
  );
};

export {TabMenuButton};
