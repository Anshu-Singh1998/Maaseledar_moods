import React from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  View,
  useWindowDimensions,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const SIZE_STYLES = {
  small: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 12,
    minHeight: 32,
  },
  medium: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 15,
    minHeight: 44,
  },
  large: {
    paddingVertical: 18,
    paddingHorizontal: 28,
    fontSize: 18,
    minHeight: 52,
  },
};

const CustomButton = ({
  title,
  onPress,
  variant = 'primary',
  backgroundColor,
  textColor,
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  size = 'medium', // new prop
  style,
  textStyle,
}) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const sizeStyle = SIZE_STYLES[size] || SIZE_STYLES.medium;

  const resolvedBg = backgroundColor ?? styles[variant]?.backgroundColor;
  const resolvedText = textColor ?? styles[`${variant}Text`]?.color;

  return (
    <Pressable
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: resolvedBg,
          paddingVertical: moderateScale(
            isLandscape ? sizeStyle.paddingVertical - 2 : sizeStyle.paddingVertical
          ),
          paddingHorizontal: moderateScale(sizeStyle.paddingHorizontal),
          minHeight: moderateScale(sizeStyle.minHeight),
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={resolvedText} />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.icon}>{leftIcon}</View>}

          {title && (
            <Text
              style={[
                styles.text,
                { color: resolvedText, fontSize: moderateScale(sizeStyle.fontSize) },
                textStyle,
              ]}
            >
              {title}
            </Text>
          )}

          {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    marginHorizontal: moderateScale(6),
  },

  text: {
    fontWeight: '600',
  },

  /* Variants */
  primary: {
    backgroundColor: '#2563EB',
  },
  secondary: {
    backgroundColor: '#E5E7EB',
  },
  outline: {
    borderWidth: 1,
    borderColor: '#2563EB',
    backgroundColor: 'transparent',
  },

  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#111827',
  },
  outlineText: {
    color: '#2563EB',
  },
});

export default CustomButton;