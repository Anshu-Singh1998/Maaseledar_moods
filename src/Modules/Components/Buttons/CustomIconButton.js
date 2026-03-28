import React from 'react';
import {
  Pressable,
  StyleSheet,
  ActivityIndicator,
  View,
  useWindowDimensions,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const CustomIconButton = ({
  icon,                 // REQUIRED: React element
  onPress,
  variant = 'ghost',    // primary | secondary | outline | ghost
  backgroundColor,
  disabled = false,
  loading = false,
  style,
}) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const resolvedBg =
    backgroundColor ?? styles[variant]?.backgroundColor;

  return (
    <Pressable
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: resolvedBg,
          opacity: disabled ? 0.4 : pressed ? 0.75 : 1,
          padding: moderateScale(isLandscape ? 10 : 12),
        },
        style, // parent controls position/size
      ]}
      hitSlop={8} // extra tap area
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.iconWrapper}>
          {icon}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    minWidth: moderateScale(44),
    minHeight: moderateScale(44),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(12),
  },

  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Variants */
  primary: {
    backgroundColor: '#2563EB',
  },
  secondary: {
    backgroundColor: '#E5E7EB',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
});

export default CustomIconButton;