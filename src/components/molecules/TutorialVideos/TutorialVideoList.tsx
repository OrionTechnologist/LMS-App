import React, {useEffect} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import {
  clearGetTutorialVideosActionResponse,
  getTutorialVideosAction,
} from '@/redux/actions/httpActions';
import {useAppSelector} from '@/hooks';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import {TutorialVideosCollection} from '@/types';
import {TutorialVideoCard} from '@/components/molecules/TutorialVideos/TutorialVideoCard';
import {convertToString} from '@/utils';
import {ActionLoader} from '@/components/atoms/ActionLoader';

const TutorialVideoList = () => {
  const getTutorialVideosHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.GET_TUTORIAL_VIDEOS];
  const tutorialVideosResults: TutorialVideosCollection =
    getTutorialVideosHttpResponse?.data;
  const tutorialVideos = tutorialVideosResults?.results ?? [];

  const getTutorialVideos = () => {
    getTutorialVideosAction();
  };

  useEffect(() => {
    getTutorialVideos();

    return () => {
      clearGetTutorialVideosActionResponse();
    };
  }, []);

  return (
    <>
      <View className={'p-[10px] rounded-[9px]'}>
        <SafeAreaView style={{flex: 1, width: '100%'}}>
          <FlatList
            data={tutorialVideos}
            numColumns={2}
            renderItem={({item, index}) => {
              const isLastItem = index === tutorialVideos.length - 1;

              return (
                <TutorialVideoCard
                  key={item?.id}
                  data={item}
                  isLastItem={isLastItem}
                />
              );
            }}
            keyExtractor={item => convertToString(item.id)}
          />
        </SafeAreaView>
      </View>

      <ActionLoader
        show={getTutorialVideosHttpResponse?.loading}
        label={'Loading tutorials'}
      />
    </>
  );
};

export {TutorialVideoList};
