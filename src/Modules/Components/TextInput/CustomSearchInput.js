import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const CustomSearchInput = ({
  value,
  onChangeText,
  placeholder = 'Search',
  onClear,
  leftIcon,
  rightIcon,
  style,
  inputStyle,
}) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <View style={[styles.container, style]}>
      {/* Search Icon */}
      <View style={styles.iconLeft}>{leftIcon}</View>

      {/* Input */}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        style={[
          styles.input,
          { fontSize: moderateScale(isLandscape ? 14 : 15) },
          inputStyle,
        ]}
        returnKeyType="search"
        clearButtonMode="never"
      />

      {/* Clear Icon */}
      {value?.length > 0 && onClear && (
        <Pressable onPress={onClear} hitSlop={8}>
          <View style={styles.iconRight}>{rightIcon}</View>
        </Pressable>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    minHeight: moderateScale(44), // accessibility safe
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(12),
    backgroundColor: '#F3F4F6',
    paddingHorizontal: moderateScale(12),
  },

  input: {
    flex: 1,
    paddingVertical: moderateScale(10),
    color: '#111827',
  },

  iconLeft: {
    marginRight: moderateScale(8),
  },

  iconRight: {
    marginLeft: moderateScale(8),
  },
});

export default CustomSearchInput;