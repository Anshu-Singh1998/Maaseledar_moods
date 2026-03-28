import React from 'react';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const CustomCards = ({
  children,
  onPress,
  variant = 'default', // default | outlined | flat
  style,
}) => {
  const Container = onPress ? Pressable : View;

  return (
    <Container
      onPress={onPress}
      style={[
        styles.base,
        styles[variant],
        style, // parent controls layout
      ]}
    >
      {children}
    </Container>
  );
};
const styles = StyleSheet.create({
  base: {
    borderRadius: moderateScale(14),
    backgroundColor: '#FFFFFF',
    padding: moderateScale(14),
  },

  default: {
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
    }),
  },

  outlined: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  flat: {
    elevation: 0,
    shadowOpacity: 0,
  },
});

export default CustomCards;