import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { verticalScale, moderateScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import Fonts from '../../Theme/Fonts';

const CustomAlert = ({
  visible,
  title,
  message,
  primaryText = 'OK',
  secondaryText,
  onPrimaryPress,
  onSecondaryPress,
  dismissible = false,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => {
        if (dismissible && onSecondaryPress) {
          onSecondaryPress();
        }
      }}
    >
      <SafeAreaView style={styles.overlay}>
        <View style={styles.alertBox}>
          {/* Title */}
          {title ? <Text style={styles.title}>{title}</Text> : null}

          {/* Message */}
          {message ? <Text style={styles.message}>{message}</Text> : null}

          {/* Buttons */}
          <View style={styles.buttonRow}>
            {secondaryText && (
              <Pressable
                style={[styles.button, styles.secondaryButton]}
                onPress={onSecondaryPress}
              >
                <Text style={styles.secondaryText}>{secondaryText}</Text>
              </Pressable>
            )}

            <Pressable
              style={[styles.button, styles.primaryButton]}
              onPress={onPrimaryPress}
            >
              <Text style={styles.primaryText}>{primaryText}</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(24),
  },

  alertBox: {
    width: '100%',
    borderRadius: moderateScale(12),
    backgroundColor: '#FFF',
    padding: moderateScale(20),
  },

  title: {
    fontSize: Fonts.size.lg,
    fontFamily: Fonts.family.bold,
    color: '#111',
    marginBottom: verticalScale(8),
  },

  message: {
    fontSize: Fonts.size.md,
    fontFamily: Fonts.family.regular,
    color: '#555',
    lineHeight: Fonts.lineHeight(14),
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: verticalScale(20),
  },

  button: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(8),
    marginLeft: moderateScale(10),
  },

  primaryButton: {
    backgroundColor: '#0066FF',
  },

  secondaryButton: {
    backgroundColor: '#F1F1F1',
  },

  primaryText: {
    fontSize: Fonts.size.md,
    fontFamily: Fonts.family.semiBold,
    color: '#FFF',
  },

  secondaryText: {
    fontSize: Fonts.size.md,
    fontFamily: Fonts.family.medium,
    color: '#333',
  },
});

export default CustomAlert;