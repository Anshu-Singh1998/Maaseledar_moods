import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const CustomTextInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  leftIcon,
  rightIcon,
  error,
  helperText,
  disabled = false,
  secureTextEntry = false,
  keyboardType = 'default',
  style,
  inputStyle,
}) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <View style={[styles.container, style]}>
      {/* Label */}
      {label && <Text style={styles.label}>{label}</Text>}

      {/* Input Wrapper */}
      <View
        style={[
          styles.inputWrapper,
          error && styles.errorBorder,
          disabled && styles.disabled,
        ]}
      >
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          editable={!disabled}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          style={[
            styles.input,
            {
              fontSize: moderateScale(isLandscape ? 14 : 15),
            },
            inputStyle,
          ]}
        />

        {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
      </View>

      {/* Error / Helper Text */}
      {(error || helperText) && (
        <Text style={[styles.helperText, error && styles.errorText]}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  label: {
    marginBottom: moderateScale(6),
    fontSize: moderateScale(13),
    fontWeight: '500',
    color: '#374151',
  },

  inputWrapper: {
    minHeight: moderateScale(48), // accessibility safe
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(12),
    backgroundColor: '#FFFFFF',
  },

  input: {
    flex: 1,
    paddingVertical: moderateScale(10),
    color: '#111827',
  },

  icon: {
    marginHorizontal: moderateScale(6),
  },

  helperText: {
    marginTop: moderateScale(4),
    fontSize: moderateScale(12),
    color: '#6B7280',
  },

  errorText: {
    color: '#DC2626',
  },

  errorBorder: {
    borderColor: '#DC2626',
  },

  disabled: {
    backgroundColor: '#F3F4F6',
  },
});

export default CustomTextInput;