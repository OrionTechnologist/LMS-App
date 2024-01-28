import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {OtpTextInput} from '@/components/atoms/TextInput';
import {useIsFocused} from '@react-navigation/native';

interface OtpFormProps {
  onChange?(value: string): void;
}

const OtpForm: React.FC<OtpFormProps> = props => {
  const {onChange} = props;
  const isFocused = useIsFocused();

  const digit1Ref = useRef<any>(null);
  const digit2Ref = useRef<any>(null);
  const digit3Ref = useRef<any>(null);
  const digit4Ref = useRef<any>(null);

  const [digit1, setDigit1] = useState<string>('');
  const [digit2, setDigit2] = useState<string>('');
  const [digit3, setDigit3] = useState<string>('');
  const [digit4, setDigit4] = useState<string>('');

  const otpCodeString = `${digit1}${digit2}${digit3}${digit4}`;

  useEffect(() => {
    if (onChange) {
      onChange(otpCodeString);
    }
  }, [otpCodeString]);

  useEffect(() => {
    setDigit1('');
    setDigit2('');
    setDigit3('');
    setDigit4('');
  }, [isFocused]);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: -10,
          marginRight: -10,
          marginTop: 32,
        }}>
        <View style={{flexBasis: '25%', padding: 10}}>
          <OtpTextInput
            ref={digit1Ref}
            placeholder={'X'}
            value={digit1}
            onChangeText={value => {
              setDigit1(value);
              if (value !== '') {
                digit2Ref?.current?.focus();
              }
            }}
          />
        </View>

        <View style={{flexBasis: '25%', padding: 10}}>
          <OtpTextInput
            ref={digit2Ref}
            placeholder={'X'}
            value={digit2}
            onChangeText={value => {
              setDigit2(value);
              if (value !== '') {
                digit3Ref?.current?.focus();
              } else {
                digit1Ref?.current?.focus();
              }
            }}
          />
        </View>

        <View style={{flexBasis: '25%', padding: 10}}>
          <OtpTextInput
            ref={digit3Ref}
            placeholder={'X'}
            value={digit3}
            onChangeText={value => {
              setDigit3(value);
              if (value !== '') {
                digit4Ref?.current?.focus();
              } else {
                digit2Ref?.current?.focus();
              }
            }}
          />
        </View>

        <View style={{flexBasis: '25%', padding: 10}}>
          <OtpTextInput
            ref={digit4Ref}
            placeholder={'X'}
            value={digit4}
            onChangeText={value => {
              setDigit4(value);
              if (value === '') {
                digit3Ref?.current?.focus();
              }
            }}
          />
        </View>
      </View>
    </>
  );
};

export {OtpForm};
