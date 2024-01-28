import React from 'react';
import PhoneInput, {PhoneInputProps} from 'react-native-phone-number-input';
import {Text} from 'react-native';

interface PhoneNumberInputProps {
  value?: any;
  onChange?(value: any): void;
  error?: boolean;
  errorMessage?: string;
  defaultCountryCode?: PhoneInputProps['defaultCode'];
  placeholder?: string;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = props => {
  const {
    value,
    onChange,
    errorMessage,
    error,
    defaultCountryCode,
    placeholder,
  } = props;

  const hasError = error || !!errorMessage;

  return (
    <>
      <PhoneInput
        defaultCode={defaultCountryCode}
        defaultValue={value}
        value={value}
        layout="first"
        onChangeText={onChange}
        onChangeFormattedText={onChange}
        withDarkTheme
        containerStyle={{
          height: 60,
          width: '100%',
          borderRadius: 5,
          borderWidth: hasError ? 2 : 1,
          borderColor: hasError ? '#ff4d4d' : '#E8ECF4',
        }}
        textContainerStyle={{
          backgroundColor: '#F7F8F9',
          borderRadius: 5,
          flex: 1,
          borderLeftWidth: 1,
          borderColor: '#E8ECF4',
        }}
        textInputStyle={{
          height: 60,
          color: '#1E232C',
        }}
        textInputProps={{
          placeholderTextColor: '#8391A1',
        }}
        placeholder={placeholder}
      />

      {errorMessage && (
        <Text className={'text-[#ff4d4d] mt-[2px] text-[13px]'}>
          {errorMessage}
        </Text>
      )}
    </>
  );
};

export {PhoneNumberInput};
