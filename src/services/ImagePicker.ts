import {launchImageLibrary} from 'react-native-image-picker';
import {Alert, Platform} from 'react-native';

interface ImagePickerFile {
  uri?: string;
  type?: string;
  name?: string;
  base64?: string;
}

interface ImagePickerResponse {
  files: ImagePickerFile[];
  error?: boolean;
  errorMessage?: string;
}

interface ImagePickerOptions {
  selectionLimit?: number;
}

export const ImagePicker = {
  async openImagePicker(
    options?: ImagePickerOptions,
  ): Promise<ImagePickerResponse> {
    return new Promise((resolve, reject) => {
      launchImageLibrary(
        {
          mediaType: 'photo',
          selectionLimit: options?.selectionLimit,
          presentationStyle: 'popover',
          includeBase64: true,
        },
        response => {
          if (response?.errorCode) {
            const errorMessage =
              response?.errorCode === 'permission'
                ? 'No permission to access camera'
                : 'Failed to open image picker!';

            Alert.alert('Error', errorMessage);
            reject({
              error: true,
              errorMessage,
            });
          } else {
            const files: ImagePickerFile[] = [];

            response?.assets?.forEach(item => {
              if (item?.uri) {
                files.push({
                  uri:
                    Platform.OS === 'android'
                      ? item?.uri
                      : item?.uri.replace('file://', ''),
                  type: 'image/jpeg',
                  name: item?.fileName,
                  base64: item?.base64,
                });
              }
            });

            resolve({
              files,
            });
          }
        },
      );
    });
  },
};
