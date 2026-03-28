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
import { useDispatch } from 'react-redux';

import Colors from '../../../../../Constants/Colors';
import Fonts from '../../../../Theme/Fonts';
import CustomCards from '../../../../Components/Card/CustomCards';
import { logout } from '../../../../redux/slices/authSlice';

// ─── MAIN
const Settings = () => {
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState(true);
  const [storeOpen, setStoreOpen] = useState(true);
const SettingRow = ({ icon, label, value }) => (
  <Pressable style={styles.row}>
    <View style={styles.rowLeft}>
      <Icon name={icon} size={18} color="#374151" />
      <Text style={styles.label}>{label}</Text>
    </View>

    <View style={styles.rowRight}>
      {value && <Text style={styles.value}>{value}</Text>}
      <Icon name="chevron-forward" size={16} color="#9CA3AF" />
    </View>
  </Pressable>
);

const SettingSwitch = ({ icon, label, value, onChange }) => (
  <View style={styles.row}>
    <View style={styles.rowLeft}>
      <Icon name={icon} size={18} color="#374151" />
      <Text style={styles.label}>{label}</Text>
    </View>

    <Switch value={value} onValueChange={onChange} />
  </View>
);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* 👤 PROFILE */}
        <CustomCards style={styles.profileCard}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100' }}
            style={styles.avatar}
          />

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Sharma Namkeen Store</Text>
            <Text style={styles.subText}>Owner: Rahul Sharma</Text>
          </View>

          <Pressable>
            <Icon name="create-outline" size={20} color="#F97316" />
          </Pressable>
        </CustomCards>

        {/* 🏪 STORE SETTINGS */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Store Settings</Text>

          <SettingRow
            icon="time-outline"
            label="Store Timings"
            value="9 AM - 9 PM"
          />

          <SettingSwitch
            icon="storefront-outline"
            label="Store Open"
            value={storeOpen}
            onChange={setStoreOpen}
          />
        </CustomCards>

        {/* 🔔 NOTIFICATIONS */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Notifications</Text>

          <SettingSwitch
            icon="notifications-outline"
            label="Push Notifications"
            value={notifications}
            onChange={setNotifications}
          />
        </CustomCards>

        {/* 💳 PAYMENTS */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Payments</Text>

          <SettingRow
            icon="card-outline"
            label="Bank Account"
            value="HDFC •••• 4587"
          />

          <SettingRow
            icon="wallet-outline"
            label="UPI ID"
            value="rahul@upi"
          />
        </CustomCards>

        {/* 🧩 SUPPORT */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Support</Text>

          <SettingRow icon="help-circle-outline" label="Help Center" />
          <SettingRow icon="call-outline" label="Contact Support" />
        </CustomCards>

        {/* 🚪 LOGOUT */}
        <Pressable style={styles.logoutBtn} onPress={() => dispatch(logout())}>
          <Icon name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  profileCard: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },

  name: {
    fontWeight: '700',
    fontSize: 16,
  },

  subText: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 2,
  },

  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
  },

  sectionTitle: {
    fontWeight: '700',
    marginBottom: 10,
  },

  row: {
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

  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  label: {
    fontSize: 14,
    color: '#111827',
  },

  value: {
    fontSize: 12,
    color: '#6B7280',
  },

  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#FEE2E2',
    gap: 8,
  },

  logoutText: {
    color: '#EF4444',
    fontWeight: '700',
  },
});
export default Settings;