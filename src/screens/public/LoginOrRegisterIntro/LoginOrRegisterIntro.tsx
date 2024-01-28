import React from 'react';
import {Image, View, Dimensions, Text} from 'react-native';
import {LoginOrRegisterCurveBg, SplashLogo} from '@/assets/images';
import {Button} from '@/components/atoms/Button';
import {useNavigation} from '@react-navigation/native';
import {routes} from '@/routes';
import {PublicLayout} from '@/components/middlewares/auth';

const LoginOrRegisterIntro = () => {
  const {navigate} = useNavigation();

  const gotoLoginPage = () => navigate(routes.public.loginScreen as never);
  const gotoRegisterPage = () =>
    navigate(routes.public.registerScreen as never);
  const screenWidth = Dimensions.get('window').width;

  return (
    <>
      <PublicLayout>
        <View className={'flex-grow flex flex-col'}>
          <View className={'flex relative h-[260px]'}>
            <Image
              source={LoginOrRegisterCurveBg}
              className={'absolute bottom-[0]'}
              style={{width: screenWidth}}
              resizeMethod={'auto'}
            />

            <View className={'absolute top-[70px] left-[0] right-[0]'}>
              <View className={'w-full'}>
                <Text
                  className={
                    'text-white text-[35px] font-poppins-medium text-center'
                  }>
                  U-Pay Earn
                </Text>
                <View className={'flex-grow items-center mt-[43px]'}>
                  <Image
                    source={SplashLogo}
                    className={'w-[161px] h-[161px]'}
                  />
                </View>
              </View>
            </View>
          </View>

          <View
            className={'flex flex-grow justify-center items-center p-[21px]'}>
            <View className={'mb-[36px] w-full'}>
              <Button title={'Login'} onPress={gotoLoginPage} />
            </View>

            <View className={'flex'}>
              <View className={'flex flex-row w-[full] justify-center'}>
                <Text
                  className={'text-[#1E232C] text-[15px] font-poppins-regular'}>
                  Don't have an account?{' '}
                </Text>
                <Text
                  className={'text-primary text-[15px] font-poppins-bold'}
                  onPress={gotoRegisterPage}>
                  Register Now
                </Text>
              </View>
            </View>
          </View>
        </View>
      </PublicLayout>
    </>
  );
};

export default LoginOrRegisterIntro;
