import React from 'react';
import {Text, View} from 'react-native';
import {ProfileAvatar} from '@/components/atoms/ProfileAvatar';
import {useNavigation} from '@react-navigation/native';
import {routes} from '@/routes';
import {useAuth} from '@/hooks';
import {generateShortName} from '@/utils';
import {useApplicationSettings} from '@/hooks/useApplicationSettings';
import {
  PackageInfoButton,
  BalanceViewButton,
} from '@/components/organisms/ProfileInfo';
import {ProfileEditButton} from '@/components/organisms/ProfileInfo/ProfileEditButton';

export interface ProfileInfoProps {
  showEditProfile?: boolean;
}

const ProfileInfo: React.FC<ProfileInfoProps> = props => {
  const {showEditProfile} = props;
  const {navigate} = useNavigation();
  const {userData} = useAuth();
  const {} = useApplicationSettings();

  const profileShortName = generateShortName(
    userData?.first_name,
    userData?.last_name,
  );

  const gotoEditProfilePage = () =>
    navigate(routes.private.editProfileScreen as never);

  return (
    <>
      <View className={'flex flex-row flex-grow items-center px-[40px]'}>
        <ProfileAvatar
          src={userData?.profile_photo}
          alt={profileShortName}
          size={50}
          onPress={gotoEditProfilePage}
        />
        <View className={'ml-[38px] flex-grow max-w-[70%]'}>
          <Text
            className={'font-poppins-medium text-[20px] font-[700] text-white'}
            ellipsizeMode={'tail'}
            numberOfLines={1}>
            {userData?.first_name} {userData?.last_name}
          </Text>
          <Text
            className={'font-poppins-regular text-[14px] text-white mt-[2px]'}
            ellipsizeMode={'tail'}
            numberOfLines={1}>
            {userData?.email}
          </Text>

          <View className={'flex flex-row items-center mt-[14px]'}>
            {showEditProfile ? (
              <>
                <ProfileEditButton />
              </>
            ) : (
              <>
                {userData?.package && (
                  <PackageInfoButton style={{marginRight: 6}} />
                )}

                <BalanceViewButton />
              </>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export {ProfileInfo};
