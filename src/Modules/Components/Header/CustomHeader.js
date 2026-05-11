import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../../../Constants/Colors';

const CustomHeader = ({
  title,
  navigation,
  showBack = true,
  rightIcon,
  onRightPress,
  backgroundColor = colors.orange,
  titleColor = '#fff',
}) => {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <StatusBar barStyle="light-content" />

      <View style={[styles.header, { backgroundColor }]}>
        {/* 🔙 LEFT */}
        {showBack ? (
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('Dashboard');
              }
            }}
          >
            <Icon name="arrow-back" size={22} color={titleColor} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 22 }} />
        )}

        {/* 🏷 TITLE */}
        <Text style={[styles.title, { color: titleColor }]} numberOfLines={1}>
          {title}
        </Text>

        {/* 👉 RIGHT */}
        {rightIcon ? (
          <TouchableOpacity onPress={onRightPress}>
            <Icon name={rightIcon} size={22} color={titleColor} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 22 }} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
  },

  header: {
    // height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: 'blue',
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
  },
});
