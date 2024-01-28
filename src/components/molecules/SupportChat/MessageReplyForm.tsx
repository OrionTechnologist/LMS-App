import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator, TextInput} from 'react-native-paper';
import {AttachmentIcon, MessageSendIcon} from '@/assets/icons';
import {ImagePicker} from '@/services';
import {
  clearUploadFileActionResponse,
  sendSupportMessageAction,
  uploadFileAction,
} from '@/redux/actions/httpActions';
import {useAppSelector} from '@/hooks';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';
import {FileUploadResponse} from '@/types';
import Toast from 'react-native-simple-toast';
import {alertMessages} from '@/config/alert-messages';
import {ActionLoader} from '@/components/atoms/ActionLoader';
import {colors} from '@/config/colors';

interface MessageReplyFormProps {}

const MessageReplyForm: React.FC<MessageReplyFormProps> = () => {
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);
  const [attachmentPreviewUrl, setAttachmentPreviewUrl] = useState<
    string | null
  >(null);
  const [messageText, setMessageText] = useState('');

  const fileUploadHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.UPLOAD_FILE];
  const messageSendHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.SEND_SUPPORT_MESSAGE];
  const messageSendLoading = messageSendHttpResponse?.loading;

  const handlePressUploadAttachment = async () => {
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

  const showAttachmentRemoveConfirmation = () => {
    Alert.alert(
      'Remove attachment',
      'Are you sure to remove this attachment?',
      [
        {
          text: 'Cancel',
          onPress() {},
        },
        {
          text: 'Remove',
          onPress() {
            setAttachmentUrl(null);
            setAttachmentPreviewUrl(null);
          },
        },
      ],
    );
  };

  const sendMessage = () => {
    if ((messageText?.trim() === '' && !attachmentUrl) || messageSendLoading) {
      return;
    }

    sendSupportMessageAction({
      message: messageText,
      image_url: attachmentUrl,
    });
    setMessageText('');
    setAttachmentUrl(null);
    setAttachmentPreviewUrl(null);
  };

  useEffect(() => {
    if (fileUploadHttpResponse?.success) {
      clearUploadFileActionResponse();
      const response: FileUploadResponse = fileUploadHttpResponse?.data;
      const url = response?.file_path ?? '';
      const previewUrl = response?.file_path_preview ?? '';

      setAttachmentUrl(url);
      setAttachmentPreviewUrl(previewUrl);
    }

    if (fileUploadHttpResponse?.error) {
      clearUploadFileActionResponse();
      Toast.show(alertMessages.photoUploadFailed, Toast.SHORT);
    }
  }, [fileUploadHttpResponse]);

  return (
    <>
      <View
        className={
          'flex flex-col justify-center px-[15px] h-[75px] flex justify-center'
        }>
        <View
          className={
            'flex flex-row items-center h-[55px] rounded-[10px] bg-[#e6e6e6]'
          }>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: '#d3d3d3',
                height: 40,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              className={'rounded-full ml-[10px]'}
              activeOpacity={0.5}
              onPress={
                attachmentUrl && attachmentPreviewUrl
                  ? showAttachmentRemoveConfirmation
                  : handlePressUploadAttachment
              }>
              {attachmentUrl && attachmentPreviewUrl ? (
                <ImageBackground
                  source={{uri: attachmentPreviewUrl}}
                  imageStyle={{
                    resizeMode: 'cover',
                    borderRadius: 10,
                  }}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 10,
                  }}
                />
              ) : (
                <Image
                  source={AttachmentIcon}
                  className={'w-[20px] h-[20px]'}
                />
              )}
            </TouchableOpacity>
          </View>
          <TextInput
            style={{
              borderColor: 'black',
              color: 'red',
              fontSize: 16,
              backgroundColor: 'transparent',
              flex: 1,
              fontFamily: 'Poppins-Normal',
              padding: 0,
              marginTop: 0,
            }}
            placeholder={'Write a message'}
            placeholderTextColor={'#757575'}
            textColor={'#000000'}
            outlineStyle={{borderWidth: 0}}
            mode={'outlined'}
            multiline={true}
            numberOfLines={6}
            textAlignVertical={'center'}
            value={messageText}
            onChangeText={text => setMessageText(text)}
          />

          <View>
            <TouchableOpacity
              style={{
                backgroundColor: '#d3d3d3',
                height: 40,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
                opacity:
                  messageText?.trim() === '' &&
                  !attachmentUrl &&
                  !messageSendLoading
                    ? 0.5
                    : 1,
              }}
              className={'rounded-full mr-[10px]'}
              activeOpacity={0.5}
              onPress={sendMessage}>
              {messageSendLoading ? (
                <ActivityIndicator animating={true} color={colors.primary} />
              ) : (
                <Image
                  source={MessageSendIcon}
                  className={'w-[20px] h-[20px]'}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ActionLoader
        show={fileUploadHttpResponse?.loading}
        label={'Uploading'}
      />
    </>
  );
};

export {MessageReplyForm};
