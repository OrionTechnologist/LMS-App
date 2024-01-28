import React from 'react';
import {ActivityIndicator, Text, TouchableRipple} from 'react-native-paper';
import classNames from 'classnames';
import {colors} from '@/config/colors';
import {View, ViewStyle} from 'react-native';

interface ButtonProps {
  title?: string;
  className?: string;
  style?: ViewStyle;
  variant?: 'primary';
  rippleColor?: string;
  loaderColor?: string;
  disabled?: boolean;
  loading?: boolean;

  onPress?(): void;
}

const Button: React.FC<ButtonProps> = props => {
  const {
    title,
    className,
    style,
    variant = 'primary',
    rippleColor,
    loaderColor,
    disabled,
    loading,
    onPress,
  } = props;

  const getRippleColor = () => {
    let color = rippleColor;

    if (rippleColor) {
      return color;
    }

    switch (variant) {
      case 'primary':
        color = colors.buttonPrimaryRipple;
    }

    return color;
  };

  const getLoaderColor = () => {
    let color = loaderColor;

    if (loaderColor) {
      return color;
    }

    switch (variant) {
      case 'primary':
        color = colors.white;
    }

    return color;
  };

  return (
    <>
      <TouchableRipple
        rippleColor={getRippleColor()}
        className={classNames(
          className,
          'rounded-[8px] flex w-[100%] p-[16px] flex align-center items-center',
          {
            'bg-primary': variant === 'primary',
            'opacity-[0.8]': disabled || loading,
          },
        )}
        disabled={disabled || loading}
        style={style}
        onPress={onPress}>
        <View className={'flex flex-row gap-[15px] items-center'}>
          {loading && (
            <ActivityIndicator animating={true} color={getLoaderColor()} />
          )}
          <Text
            className={classNames('font-poppins-medium text-[17px]', {
              'text-white': variant === 'primary',
            })}>
            {title}
          </Text>
        </View>
      </TouchableRipple>
    </>
  );
};

export {Button};
