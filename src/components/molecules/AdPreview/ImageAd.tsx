import React from 'react';
import {Dimensions, Image} from 'react-native';

interface ImageAdProps {
  onLoading?(): void;
  onLoaded?(): void;
  url: string;
}

const {width, height} = Dimensions.get('window');

const ImageAd: React.FC<ImageAdProps> = props => {
  const {onLoading, onLoaded, url} = props;

  return (
    <>
      <Image
        resizeMode={'cover'}
        source={{uri: url}}
        onLoadStart={onLoading}
        onLoad={onLoaded}
        style={{
          width: width,
          height: height,
        }}
      />
    </>
  );
};

export {ImageAd};
