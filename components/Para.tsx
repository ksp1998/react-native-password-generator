import React from 'react';
import {
  Text,
  useColorScheme,
  StyleSheet,
  TextStyle,
  TextProps,
} from 'react-native';

interface Props extends TextProps {
  style?: TextStyle[];
}

const Para = ({children, style = [], ...props}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Text
      style={[...style, isDarkMode ? styles.darkColor : styles.lightColor]}
      {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  darkColor: {color: '#fff'},
  lightColor: {color: '#000'},
});

export default Para;
