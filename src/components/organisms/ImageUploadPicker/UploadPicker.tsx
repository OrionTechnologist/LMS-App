import React, {useEffect} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {ImagePicker} from '@/services';
import {
  clearUploadFileActionResponse,
  uploadFileAction,
} from '@/redux/actions/httpActions';
import {FileUploadResponse} from '@/types';
import Toast from 'react-native-simple-toast';
import {alertMessages} from '@/config/alert-messages';
import {useAppSelector} from '@/hooks';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import {ActionLoader} from '@/components/atoms/ActionLoader';

interface UploadPickerProps {
  label?: string;
  errorMessage?: string;
  onUploading?(): void;

  onUploadSuccess?(fileUrl: string, previewUrl: string): void;
}

const UploadPicker: React.FC<UploadPickerProps> = props => {
  const {label, onUploading, onUploadSuccess, errorMessage} = props;
  const fileUploadHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.UPLOAD_FILE];

  const uploading = fileUploadHttpResponse?.loading;

  const handlePressPicker = async () => {
    if (uploading) {
      return;
    }

    if (onUploading) {
      onUploading();
    }

    const {files, error} = await ImagePicker.openImagePicker({
      selectionLimit: 1,
    });
    if (!error && files?.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
      uploadFileAction(formData);
    }
  };

  useEffect(() => {
    if (fileUploadHttpResponse?.success) {
      clearUploadFileActionResponse();
      const response: FileUploadResponse = fileUploadHttpResponse?.data;
      const url = response?.file_path ?? '';
      const previewUrl = response?.file_path_preview ?? '';

      if (onUploadSuccess) {
        onUploadSuccess(url, previewUrl);
      }
    }

    if (fileUploadHttpResponse?.error) {
      clearUploadFileActionResponse();
      Toast.show(alertMessages.photoUploadFailed, Toast.SHORT);
    }
  }, [fileUploadHttpResponse]);

  return (
    <>
      <TouchableOpacity
        className={
          'h-[60px] border border-[1px] border-dashed border-[#C4C9D1] bg-[#F7F8F9] rounded-[8px] flex justify-center items-center'
        }
        activeOpacity={0.8}
        onPress={handlePressPicker}>
        <Text
          className={'text-[16px] font-[500] font-poppins-bold text-[#8391A1]'}>
          {label ?? 'Select an Image'}
        </Text>
      </TouchableOpacity>
      {errorMessage && (
        <Text className={'text-[#ff4d4d] mt-[2px] text-[13px]'}>
          {errorMessage}
        </Text>
      )}

      <ActionLoader show={uploading} label={'Uploading'} />
    </>
  );
};

export {UploadPicker};
