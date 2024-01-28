import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {routes} from '@/routes';
import {useNavigation} from '@react-navigation/native';

const ProfileEditButton = () => {
  const {navigate} = useNavigation();

  const gotoEditProfilePage = () =>
    navigate(routes.private.editProfileScreen as never);
  return (
    <>
      <TouchableOpacity
        className={'p-[8px] px-[21px] bg-white rounded-[10px]'}
        activeOpacity={0.8}
        style={{elevation: 3}}
        onPress={gotoEditProfilePage}>
        <Text className={`text-[#7519B4] font-bold text-[12px]`}>
          Edit Profile
        </Text>
      </TouchableOpacity>
    </>
  );
};

export {ProfileEditButton};
