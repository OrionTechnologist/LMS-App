import React from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {uuid} from '@/utils';
import {PlaceholderImage} from '@/assets/images';

interface CarouselItem {
  id: string;
  uri?: string | null;

  onPress?(): void;
}

interface CarouselProps {
  data?: CarouselItem[];
}

interface CarouselInitialData {
  uri?: string | null;

  onPress?(): void;
}

const screenWidth = Dimensions.get('window').width;

export const createCarouselData = (
  data: CarouselInitialData[],
): CarouselItem[] => {
  let preparedData: CarouselItem[] = [];
  data?.forEach(item => {
    preparedData.push({
      id: uuid(),
      uri: item?.uri,
      onPress: item?.onPress,
    });
  });

  return preparedData;
};

const Carousel: React.FC<CarouselProps> = props => {
  const {data} = props;

  return (
    <FlatList
      data={data}
      renderItem={({item}) => {
        const imageSource = item?.uri ? {uri: item?.uri} : PlaceholderImage;

        return (
          <TouchableOpacity
            onPress={item?.onPress}
            style={{width: screenWidth - 26}}
            activeOpacity={0.5}>
            <ImageBackground
              className={'w-[100%] h-[170px] rounded-[7px]'}
              source={imageSource}
              resizeMode={'cover'}
              imageStyle={{borderRadius: 7}}
            />
          </TouchableOpacity>
        );
      }}
      keyExtractor={item => item.id.toString()}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    />
  );
};

export {Carousel};
