import React from 'react';
import {View, ImageBackground} from 'react-native';
import {HeaderMountainBg} from '@/assets/images';
import {ProfileInfo, ProfileInfoProps} from './ProfileInfo';
import {
  TitleContainer,
  TitleContainerProps,
} from '@/components/molecules/PageHeader/TitleContainer';
import classNames from 'classnames';
import {BackArrowIconButton} from '@/components/atoms/Button';

interface ProfileHeaderProps {
  variant: 'profile-info' | 'title-bar';
  profileInfoProps?: ProfileInfoProps;
  titleInfoProps?: TitleContainerProps;
  showBackButton?: boolean;
  onClickBackButton?(): void;
}

const PageHeader: React.FC<ProfileHeaderProps> = props => {
  const {
    variant,
    profileInfoProps,
    titleInfoProps,
    showBackButton,
    onClickBackButton,
  } = props;

  return (
    <>
      <View>
        <ImageBackground
          source={HeaderMountainBg}
          resizeMode={'cover'}
          className={classNames('flex relative', {
            'h-[160px]': variant === 'profile-info',
            'h-[130px]': variant === 'title-bar',
          })}>
          {variant === 'profile-info' && <ProfileInfo {...profileInfoProps} />}
          {variant === 'title-bar' && <TitleContainer {...titleInfoProps} />}

          {showBackButton && (
            <View
              className={'absolute h-[100%] flex justify-center left-[20px]'}>
              <BackArrowIconButton
                onPress={onClickBackButton}
                bgColor={'white'}
              />
            </View>
          )}
        </ImageBackground>
      </View>
    </>
  );
};

export {PageHeader};
