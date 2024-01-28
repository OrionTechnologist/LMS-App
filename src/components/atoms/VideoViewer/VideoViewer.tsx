import React from 'react';
import {Dimensions} from 'react-native';
import {View, StyleSheet} from 'react-native';
import Video from 'react-native-video';

interface LandscapeVideoViewerProps {
  videoUrl?: string | null;
}

const VideoViewer: React.FC<LandscapeVideoViewerProps> = props => {
  const {videoUrl} = props;

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          source={{uri: videoUrl ?? ''}}
          resizeMode="contain"
          style={styles.videoPlayer}
          controls={true}
          paused={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: '100%',
    height: Dimensions.get('window').height,
  },
  videoPlayer: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export {VideoViewer};
