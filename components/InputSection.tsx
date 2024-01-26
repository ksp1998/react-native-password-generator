import React, {useRef} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
  TextInput,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import Para from './Para';

interface Props extends TextInputProps {
  label?: string;
  style: ViewStyle[];
}

const InputSection = ({label, style, ...props}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const inputRef = useRef<TextInput | null>(null);

  return (
    <View style={[styles.inputContainer]}>
      {label && (
        <TouchableOpacity
          onPress={() => inputRef.current?.focus()}
          activeOpacity={0.8}>
          <Para>{label}</Para>
        </TouchableOpacity>
      )}
      <TextInput
        {...props}
        style={[
          isDarkMode ? styles.darkInput : styles.lightInput,
          styles.input,
          ...style,
        ]}
        ref={inputRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    borderRadius: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'teal',
    padding: 8,
  },
  lightInput: {
    backgroundColor: '#E6E6E6',
  },
  darkInput: {
    backgroundColor: '#000000',
  },
});

export default InputSection;
