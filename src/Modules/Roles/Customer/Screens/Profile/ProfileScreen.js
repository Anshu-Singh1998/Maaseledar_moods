import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../../../../../Constants/Colors';

const ProfileScreen = ({ navigation }) => {
  const menuItems = [
    { id: '1', title: 'My Orders', icon: 'cube-outline', screen: 'Orders' },
    { id: '2', title: 'Wishlist', icon: 'heart-outline', screen: 'Wishlist' },
    {
      id: '3',
      title: 'Addresses',
      icon: 'location-outline',
      screen: 'Address',
    },
    { id: '4', title: 'Offers', icon: 'pricetag-outline', screen: 'Offers' },
    {
      id: '5',
      title: 'Settings',
      icon: 'settings-outline',
      screen: 'Settings',
    },
  ];

  const renderItem = item => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => navigation.navigate(item.screen)}
      activeOpacity={0.7}
    >
      <View style={styles.menuLeft}>
        <View style={styles.iconBox}>
          <Icon name={item.icon} size={18} color={colors.orange} />
        </View>
        <Text style={styles.menuText}>{item.title}</Text>
      </View>

      <Icon name="chevron-forward" size={18} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.orange }}>
      <StatusBar barStyle="light-content" />

      {/* 🔥 FIXED HEADER (NON SCROLLABLE) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Profile</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* 📱 SCROLLABLE CONTENT */}
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* 👤 PROFILE CARD */}
          <View style={styles.profileCard}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: 'https://via.placeholder.com/100' }}
                style={styles.avatar}
              />

              {/* ✏️ EDIT ICON (ORANGE STYLE) */}
              <View style={styles.cameraIcon}>
                <Icon name="pencil" size={14} color="#fff" />
              </View>
            </View>

            <Text style={styles.name}>Anshu Singh</Text>
            <Text style={styles.email}>anshu@email.com</Text>
          </View>

          {/* 📊 ACCOUNT */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Account Info</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>9999999999</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Member Since</Text>
              <Text style={styles.value}>2024</Text>
            </View>
          </View>

          {/* 📂 MENU */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            {menuItems.map(renderItem)}
          </View>

          {/* 🚪 LOGOUT */}
          <TouchableOpacity style={styles.logoutBtn}>
            <Icon name="log-out-outline" size={20} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  /* 🔥 HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.orange,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  /* 👤 PROFILE */
  profileCard: {
    alignItems: 'center',
    marginTop: 40, // 🔥 overlap effect (premium look)
    paddingBottom: 10,
    paddingTop:10,
    backgroundColor: colors.orange,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
  },

  avatarWrapper: {
    position: 'relative',
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: colors.orange,
  },

  /* ✏️ ORANGE EDIT ICON */
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.orange,
    padding: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },

  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  email: {
    color: colors.textSecondary,
    fontSize: 13,
  },

  /* 📦 CARD */
  card: {
    backgroundColor: colors.background2,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 14,

    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  sectionTitle: {
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 12,
    color: colors.textPrimary,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },

  label: {
    color: colors.textSecondary,
  },

  value: {
    color: colors.textPrimary,
    fontWeight: '600',
  },

  /* 📂 MENU */
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },

  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    backgroundColor: colors.oraLight,
    padding: 8,
    borderRadius: 10,
  },

  menuText: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },

  /* 🚪 LOGOUT */
  logoutBtn: {
    flexDirection: 'row',
    backgroundColor: colors.orange,
    margin: 16,
    padding: 14,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:80
  },

  logoutText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: '700',
  },
});
