import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import BouncyCheckbox, {
  IBouncyCheckboxProps,
} from 'react-native-bouncy-checkbox';
import Para from './Para';

interface Props extends IBouncyCheckboxProps {
  label?: string;
  onPress?: () => void;
}

const CheckboxSection = ({label, onPress: handleOnPress, ...props}: Props) => {
  return (
    <View style={[styles.checkboxContainer]}>
      {label && (
        <TouchableOpacity onPress={handleOnPress} activeOpacity={0.8}>
          <Para>{label}</Para>
        </TouchableOpacity>
      )}
      <BouncyCheckbox disableBuiltInState onPress={handleOnPress} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default CheckboxSection;
