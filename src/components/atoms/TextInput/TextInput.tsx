import React, {useState} from 'react';
import {TextInput as PaperTextInput} from 'react-native-paper';
import {colors} from '@/config/colors';
import classNames from 'classnames';
import {PasswordEyeOnIcon, PasswordEyeOffIcon} from '@/assets/icons';
import {
  NativeSyntheticEvent,
  Text,
  TextInputKeyPressEventData,
  View,
} from 'react-native';

interface TextInputProps {
  mode?: 'flat' | 'outlined';
  placeholder?: string;
  className?: string;
  type?: 'text' | 'password';
  value?: any;
  disabled?: boolean;

  onChange?(text: string): void;

  error?: boolean;
  errorMessage?: string;

  onKeyPress?(e: NativeSyntheticEvent<TextInputKeyPressEventData>): void;
}

const TextInput: React.FC<TextInputProps> = props => {
  const {
    placeholder,
    mode,
    className,
    type,
    onChange,
    value,
    disabled,
    error,
    errorMessage,
    onKeyPress,
  } = props;
  const [viewPassword, setViewPassword] = useState(false);
  const togglePasswordVisibility = () => setViewPassword(!viewPassword);

  return (
    <>
      <View>
        <PaperTextInput
          secureTextEntry={type === 'password' && !viewPassword}
          mode={mode}
          outlineColor={'#d9d9d9'}
          activeOutlineColor={colors.primary}
          placeholder={placeholder}
          placeholderTextColor={'#8391A1'}
          className={classNames('bg-[#F7F8F9] w-[100%] p-[5px]', className, {
            'bg-[#eeeeee]': disabled,
          })}
          textColor={'#1E232C'}
          right={
            type === 'password' && (
              <PaperTextInput.Icon
                icon={viewPassword ? PasswordEyeOffIcon : PasswordEyeOnIcon}
                style={{marginTop: 12}}
                onPress={togglePasswordVisibility}
              />
            )
          }
          value={value}
          onChangeText={onChange}
          error={error || !!errorMessage}
          onKeyPress={onKeyPress}
          outlineStyle={{
            borderColor: error || !!errorMessage ? '#ff4d4d' : '#E8ECF4',
          }}
          disabled={disabled}
        />
        {errorMessage && (
          <Text className={'text-[#ff4d4d] mt-[2px] text-[13px]'}>
            {errorMessage}
          </Text>
        )}
      </View>
    </>
  );
};

export {TextInput};
