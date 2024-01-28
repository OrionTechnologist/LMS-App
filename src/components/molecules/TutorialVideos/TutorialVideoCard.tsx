import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {TutorialVideo} from '@/types';
import Video from 'react-native-video';
import {routes} from '@/routes';
import {useNavigation} from '@react-navigation/native';

interface TutorialVideoCardProps {
  data?: TutorialVideo;
  isLastItem?: boolean;
}

const TutorialVideoCard: React.FC<TutorialVideoCardProps> = props => {
  const {data, isLastItem} = props;
  const {navigate} = useNavigation();

  const gotoTutorialVideoPreviewPage = () =>
    navigate(
      routes.private.tutorialVideoPreviewScreen as never,
      {
        videoUrl: data?.video_url,
      } as never,
    );

  return (
    <>
      <TouchableOpacity
        style={{flex: 1, maxWidth: isLastItem ? '47%' : '100%'}}
        className={
          'bg-primary rounded-[15px] m-[6px] justify-center items-center p-[8px]'
        }
        onPress={gotoTutorialVideoPreviewPage}>
        <View className={'h-[97px] mb-[4px]'}>
          <Video
            source={{uri: data?.video_url ?? ''}}
            resizeMode="cover"
            style={{
              flex: 1,
              aspectRatio: 16 / 10,
              borderRadius: 15,
            }}
            controls={false}
            paused={false}
            muted={true}
          />
        </View>
        <Text
          className={'text-[13px] font-poppins-bold font-[700] text-[#ffffff]'}
          numberOfLines={1}
          ellipsizeMode="tail">
          {data?.title}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export {TutorialVideoCard};
