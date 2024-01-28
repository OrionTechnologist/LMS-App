import React, {useEffect, useState} from 'react';
import {
  AdLoader,
  VideoAd,
  ImageAd,
  RewardCounter,
} from '@/components/molecules/AdPreview';
import {View} from 'react-native';
import {colors} from '@/config/colors';
import {ActivityIndicator} from 'react-native-paper';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {ActionLoader} from '@/components/atoms/ActionLoader';
import {
  claimAdWatchRewardAction,
  clearClaimAdWatchRewardActionResponse,
} from '@/redux/actions/httpActions';
import {useAppSelector} from '@/hooks';
import {CORRELATION_IDS, selectHttpState} from '@/redux/reducers/http';

interface AdPreviewProps {
  route?: RouteProp<any>;
}

const AdPreview: React.FC<AdPreviewProps> = props => {
  const {route} = props;
  // @ts-ignore
  const {goBack} = useNavigation();
  const type = route?.params?.type;
  const previewUrl = route?.params?.previewUrl;
  const minimumWatchDuration = route?.params?.minimumWatchDuration;
  const [loading, setLoading] = useState<boolean>(true);
  const [bufferLoading, setBufferLoading] = useState(false);

  const claimAdWatchRewardHttpResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.CLAIM_AD_WATCH_REWARD];

  const closeAdPreview = () => {
    goBack();
  };

  const claimReward = () => {
    claimAdWatchRewardAction();
  };

  useEffect(() => {
    if (claimAdWatchRewardHttpResponse?.success) {
      clearClaimAdWatchRewardActionResponse();
      goBack();
    }

    if (claimAdWatchRewardHttpResponse?.error) {
      clearClaimAdWatchRewardActionResponse();
      goBack();
    }
  }, [claimAdWatchRewardHttpResponse]);

  return (
    <>
      <View
        className={
          'relative flex flex-grow justify-center items-center items-center bg-[#000000]'
        }>
        {!type || !previewUrl ? (
          <AdLoader failed={true} />
        ) : (
          <>
            {loading && <AdLoader />}

            {type === 'video' && (
              <>
                {bufferLoading && (
                  <View className={'absolute top-[50%] left-[48%] z-[9999]'}>
                    <ActivityIndicator animating={true} color={colors.white} />
                  </View>
                )}

                <VideoAd
                  url={previewUrl}
                  onLoading={() => setLoading(true)}
                  onLoaded={() => setLoading(false)}
                  onBufferLoading={() => setBufferLoading(true)}
                  onBufferLoaded={() => setBufferLoading(false)}
                />
              </>
            )}

            {type === 'image' && (
              <ImageAd
                url={previewUrl}
                onLoading={() => setLoading(true)}
                onLoaded={() => setLoading(false)}
              />
            )}

            {!loading && (
              <RewardCounter
                minimumWatchDuration={minimumWatchDuration}
                onCloseAd={closeAdPreview}
                onClaimReward={claimReward}
              />
            )}

            <ActionLoader
              show={claimAdWatchRewardHttpResponse?.loading}
              label={'Claiming reward'}
            />
          </>
        )}
      </View>
    </>
  );
};

export default AdPreview;
