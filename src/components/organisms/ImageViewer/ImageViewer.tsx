import React from 'react';
import ImageView from 'react-native-image-viewing';
import {convertToBoolean} from '@/utils';

export interface ImageViewerImage {
  uri?: string | null;
}

interface ImageViewerProps {
  open?: boolean;
  initialImageIndex?: number;
  images?: ImageViewerImage[];
  onClose?(): void;
}

const ImageViewer: React.FC<ImageViewerProps> = props => {
  const {open, initialImageIndex, images, onClose} = props;

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <ImageView
        images={(images ?? []).map(item => ({
          uri: item?.uri ?? undefined,
        }))}
        imageIndex={initialImageIndex === undefined ? 0 : initialImageIndex}
        visible={convertToBoolean(open)}
        onRequestClose={handleClose}
      />
    </>
  );
};

export {ImageViewer};
