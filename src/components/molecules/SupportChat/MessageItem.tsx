import React from 'react';
import {
  Alert,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ProfileAvatar} from '@/components/atoms/ProfileAvatar';
import classNames from 'classnames';
import {colors} from '@/config/colors';
import {openImageViewerAction} from '@/redux/actions/globalActions';

interface MessageItemProps {
  opponent?: boolean;
  avatarSrc?: string | null;
  messageText?: string | null;
  dateTime?: {
    time?: string | null;
    date?: string | null;
  };
  imageUri?: string | null;
}

const MessageItem: React.FC<MessageItemProps> = props => {
  const {opponent, avatarSrc, messageText, dateTime, imageUri} = props;

  const showImage = () => {
    if (imageUri) {
      openImageViewerAction({
        images: [{uri: imageUri}],
      });
    }
  };

  const showDateTime = () => {
    Alert.alert(
      'Message info',
      `Date: ${dateTime?.date ?? ''}\nTime: ${dateTime?.time ?? ''}`,
    );
  };

  return (
    <>
      <View className={'mb-[40px]'}>
        <View
          className={classNames('flex', {
            'flex-row': opponent,
            'flex-row-reverse': !opponent,
          })}>
          {opponent && (
            <View style={{alignSelf: 'flex-end'}}>
              <ProfileAvatar
                size={40}
                src={avatarSrc}
                placeholderImage={'admin'}
              />
            </View>
          )}
          <View
            style={{
              flex: 1,
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: opponent ? 'flex-start' : 'flex-end',
            }}>
            <View
              style={{
                backgroundColor: opponent ? '#dddddd' : colors.primary,
                marginLeft: opponent ? 16 : 0,
                maxWidth: !opponent ? '82%' : 'auto',
                borderBottomStartRadius: opponent ? 4 : 24,
                borderBottomEndRadius: !opponent ? 4 : 24,
                padding: 13,
                borderRadius: 20,
              }}>
              {messageText && (
                <Text
                  style={{
                    color: opponent ? '#000000' : '#ffffff',
                  }}
                  className={'font-poppins-medium'}>
                  {messageText}
                </Text>
              )}

              {imageUri && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={showImage}
                  className={'py-[7px]'}>
                  <ImageBackground
                    source={{
                      uri: imageUri,
                    }}
                    imageStyle={{
                      resizeMode: 'cover',
                      borderRadius: 12,
                    }}
                    className={'h-[80px] w-[180px]'}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        {(dateTime?.date || dateTime?.time) && (
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: !opponent ? 'flex-end' : 'flex-start',
              marginLeft: opponent ? 80 : 0,
              marginTop: 10,
            }}
            onPress={showDateTime}>
            <Text
              className={
                'text-[#757575] text-[13px] font-poppins-normal uppercase'
              }>
              {dateTime?.time}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export {MessageItem};
