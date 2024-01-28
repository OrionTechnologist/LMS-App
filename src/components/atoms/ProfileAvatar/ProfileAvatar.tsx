import React from 'react';
import {ImageSourcePropType, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import classNames from 'classnames';
import {convertToString} from '@/utils';
import {ProfileAvatarPlaceholder, SplashLogo} from '@/assets/images';

interface ProfileAvatarProps {
  src?: string | null;
  alt?: string | null;
  size: number;
  strokeColor?: 'white' | 'light-primary';
  onPress?(): void;
  notPressAble?: boolean;
  placeholderImage?: 'user' | 'admin';
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = props => {
  const {
    src,
    alt,
    size,
    strokeColor = 'white',
    onPress,
    notPressAble,
    placeholderImage = 'user',
  } = props;

  const imageSrc: ImageSourcePropType =
    src && convertToString(src).trim() !== ''
      ? {
          uri: src,
        }
      : placeholderImage === 'user'
      ? ProfileAvatarPlaceholder
      : SplashLogo;

  return (
    <>
      <TouchableOpacity
        className={`flex flex-row w-[${size + 4}px] rounded-full`}
        activeOpacity={onPress && !notPressAble ? 0.7 : 1}
        onPress={onPress}>
        <View
          className={classNames('flex p-[4px] rounded-full', {
            'bg-white': strokeColor === 'white',
            'bg-[#9771E8]': strokeColor === 'light-primary',
          })}>
          {imageSrc ? (
            <Avatar.Image size={size} source={imageSrc} />
          ) : (
            <Avatar.Text size={size} label={alt ?? ''} />
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

export {ProfileAvatar};
