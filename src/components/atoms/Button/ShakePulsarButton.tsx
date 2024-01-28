import React, {useRef, useEffect} from 'react';
import {TouchableOpacity, Animated, Easing, Text} from 'react-native';
import classNames from 'classnames';

interface ShakePulsarButtonProps {
  containerClass?: string;
  textClass?: string;
  onPress?(): void;
  leftAdornment?: React.ReactNode;
  title?: string;
  elevation?: number;
}

const ShakePulsarButton: React.FC<ShakePulsarButtonProps> = props => {
  const {containerClass, textClass, onPress, leftAdornment, title, elevation} =
    props;

  const scale = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  const startPulseAnimation = () => {
    return Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.2,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1.2,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]);
  };

  const startShakeAnimation = () => {
    return Animated.sequence([
      Animated.timing(rotate, {
        toValue: 15,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: -15,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 15,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: -15,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 0,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]);
  };

  useEffect(() => {
    const startAnimations = () => {
      startPulseAnimation().start(() => {
        startShakeAnimation().start(() => {
          startPulseAnimation().start(() => {
            rotate.setValue(0);
            startAnimations();
          });
        });
      });
    };

    const animationTimer = setTimeout(() => {
      startAnimations();
    }, 1000);

    return () => {
      clearTimeout(animationTimer);
    };
  }, []);

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        className={classNames(
          'w-[200px] rounded-[5px] bg-[#298262] h-[50] flex flex-row justify-center items-center',
          containerClass,
        )}
        style={[
          {
            elevation,
            transform: [
              {scale},
              {
                rotate: rotate.interpolate({
                  inputRange: [-15, 15],
                  outputRange: ['-15deg', '15deg'],
                }),
              },
            ],
          },
        ]}>
        {leftAdornment}
        <Text
          className={classNames(
            'text-[#ffffff] text-[16px] font-bold',
            textClass,
          )}>
          {title}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export {ShakePulsarButton};
