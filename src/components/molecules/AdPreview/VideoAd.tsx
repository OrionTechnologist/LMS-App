import React from 'react';
import Video from 'react-native-video';
import {Dimensions} from 'react-native';

interface VideoAdProps {
  onLoading?(): void;
  onLoaded?(): void;
  onBufferLoading?(): void;
  onBufferLoaded?(): void;
  url: string;
}

const {width, height} = Dimensions.get('window');

const VideoAd: React.FC<VideoAdProps> = props => {
  const {onLoading, onLoaded, onBufferLoading, onBufferLoaded, url} = props;

  return (
    <>
      <Video
        source={{uri: url}}
        resizeMode="contain"
        style={{
          width: width,
          height: height,
        }}
        fullscreen={true}
        controls={false}
        paused={false}
        repeat={true}
        onVideoLoadStart={onLoading}
        onVideoLoad={onLoaded}
        onLoadStart={onLoading}
        onLoad={onLoaded}
        onPlaybackStalled={onBufferLoading}
        onPlaybackResume={onBufferLoaded}
      />
    </>
  );
};

export {VideoAd};
