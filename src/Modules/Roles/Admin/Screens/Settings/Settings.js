import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomCards from '../../../../Components/Card/CustomCards';
import CustomButton from '../../../../Components/Buttons/CustomButton';

// ─── MAIN
const AdminSettingsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);


const SettingRow = ({ icon, label, right, onPress, danger }) => {
  return (
    <Pressable onPress={onPress} style={styles.settingRow}>
      <View style={styles.rowLeft}>
        <Icon
          name={icon}
          size={18}
          color={danger ? 'red' : '#374151'}
        />
        <Text
          style={[
            styles.settingText,
            danger && { color: 'red' },
          ]}
        >
          {label}
        </Text>
      </View>

      {right ? (
        right
      ) : (
        <Icon name="chevron-forward" size={16} color="#9CA3AF" />
      )}
    </Pressable>
  );
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>

        {/* 👤 PROFILE */}
        <CustomCards style={styles.card}>
          <View style={styles.profileRow}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/100' }}
              style={styles.avatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>Admin User</Text>
              <Text style={styles.email}>admin@namkeen.com</Text>
            </View>

            <Pressable onPress={() => navigation.navigate('EditProfile')}>
              <Icon name="create-outline" size={20} />
            </Pressable>
          </View>
        </CustomCards>

        {/* 🔔 APP SETTINGS */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>App Settings</Text>

          <SettingRow
            icon="notifications-outline"
            label="Notifications"
            right={<Switch value={notifications} onValueChange={setNotifications} />}
          />

          <SettingRow
            icon="moon-outline"
            label="Dark Mode"
            right={<Switch value={darkMode} onValueChange={setDarkMode} />}
          />
        </CustomCards>

        {/* 💼 BUSINESS SETTINGS */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Business Settings</Text>

          <SettingRow
            icon="cash-outline"
            label="Delivery Charges"
            onPress={() => navigation.navigate('DeliverySettings')}
          />

          <SettingRow
            icon="pricetag-outline"
            label="Minimum Order Value"
            onPress={() => navigation.navigate('MinOrderSettings')}
          />

          <SettingRow
            icon="gift-outline"
            label="Manage Offers"
            onPress={() => navigation.navigate('OfferList')}
          />
        </CustomCards>

        {/* 🔐 SECURITY */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Security</Text>

          <SettingRow
            icon="lock-closed-outline"
            label="Change Password"
            onPress={() => navigation.navigate('ChangePassword')}
          />

          <SettingRow
            icon="log-out-outline"
            label="Logout"
            danger
            onPress={() => {}}
          />
        </CustomCards>

        {/* 🚀 VERSION / FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.version}>App Version 1.0.0</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  card: {
    marginBottom: 12,
    padding: 14,
  },

  sectionTitle: {
    fontWeight: '700',
    marginBottom: 10,
  },

  // PROFILE
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  name: {
    fontWeight: '700',
    fontSize: 16,
  },

  email: {
    fontSize: 12,
    color: '#6B7280',
  },

  // SETTINGS ROW
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },

  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  settingText: {
    fontSize: 14,
  },

  // FOOTER
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },

  version: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
export default AdminSettingsScreen;