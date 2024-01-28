import React from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  TextInputProps,
} from 'react-native';
import classNames from 'classnames';

interface OtpTextInputProps {
  ref?: any;
  placeholder?: string;
  className?: string;
  value?: string;

  onChangeText?(value: string): void;

  onChange?(e: NativeSyntheticEvent<TextInputChangeEventData>): void;

  style?: TextInputProps['style'];
}

const OtpTextInput: React.FC<OtpTextInputProps> = React.forwardRef(
  (props, ref) => {
    const {placeholder, className, value, style, onChangeText} = props;

    const handleChangeText = async (content: string) => {
      if (onChangeText) {
        onChangeText(content);
      }
    };

    return (
      <>
        <TextInput
          ref={ref as any}
          placeholder={placeholder}
          keyboardType={'numeric'}
          className={classNames(
            className,
            'h-[60px] w-[100%] border border-[#E8ECF4] bg-[#F7F8F9] rounded-[8px] text-[22px] text-[#1E232C] font-poppins-regular font-poppins-bold',
            {
              'border-primary bg-white': value,
            },
          )}
          textAlignVertical={'center'}
          textAlign={'center'}
          value={value}
          onChangeText={handleChangeText}
          style={style}
          placeholderTextColor={'#a6a6a6'}
          maxLength={1}
        />
      </>
    );
  },
);

export {OtpTextInput};
