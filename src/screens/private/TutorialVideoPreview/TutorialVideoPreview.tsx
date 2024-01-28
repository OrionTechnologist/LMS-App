import React from 'react';
import {PrivateLayout} from '@/components/middlewares/auth';
import {VideoViewer} from '@/components/atoms/VideoViewer';
import {RouteProp} from '@react-navigation/native';

interface TutorialVideoPreviewProps {
  route?: RouteProp<any>;
}

const TutorialVideoPreview: React.FC<TutorialVideoPreviewProps> = props => {
  const {route} = props;
  const videoUrl = route?.params?.videoUrl;

  return (
    <PrivateLayout>
      <VideoViewer videoUrl={videoUrl} />
    </PrivateLayout>
  );
};

export default TutorialVideoPreview;
