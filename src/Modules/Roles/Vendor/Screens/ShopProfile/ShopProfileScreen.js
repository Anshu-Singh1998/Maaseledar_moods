import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomCards from '../../../../Components/Card/CustomCards';
import CustomButton from '../../../../Components/Buttons/CustomButton';
import Colors from '../../../../../Constants/Colors';
import Fonts from '../../../../Theme/Fonts';

// ─── MAIN
const ShopProfile = () => {
  const [isOpen, setIsOpen] = useState(true);
  const InfoRow = ({ icon, text }) => (
  <View style={styles.infoRow}>
    <Icon name={icon} size={16} color="#374151" />
    <Text style={styles.infoText}>{text}</Text>
  </View>
);

const StatBox = ({ label, value }) => (
  <View style={styles.statBox}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* 🖼 BANNER */}
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800' }}
            style={styles.banner}
          />

          <Pressable style={styles.editBanner}>
            <Icon name="camera" size={16} color="#fff" />
          </Pressable>
        </View>

        {/* 🏪 SHOP INFO */}
        <View style={styles.profileSection}>

          {/* LOGO */}
          <View style={styles.logoWrapper}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/100' }}
              style={styles.logo}
            />
            <Pressable style={styles.editLogo}>
              <Icon name="camera" size={14} color="#fff" />
            </Pressable>
          </View>

          {/* DETAILS */}
          <Text style={styles.shopName}>Sharma Namkeen Store</Text>
          <Text style={styles.tagline}>Authentic Taste of India</Text>

          {/* RATING */}
          <View style={styles.ratingRow}>
            <Icon name="star" size={14} color="#F97316" />
            <Text style={styles.rating}>4.5</Text>
            <Text style={styles.reviews}>(230 reviews)</Text>
          </View>

          {/* OPEN TOGGLE */}
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Store Open</Text>
            <Switch value={isOpen} onValueChange={setIsOpen} />
          </View>
        </View>

        {/* 📍 STORE DETAILS */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Store Details</Text>

          <InfoRow icon="location-outline" text="Salt Lake, Kolkata" />
          <InfoRow icon="time-outline" text="9:00 AM - 9:00 PM" />
          <InfoRow icon="grid-outline" text="Namkeen & Snacks" />
        </CustomCards>

        {/* 📊 STATS */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Performance</Text>

          <View style={styles.statsRow}>
            <StatBox label="Orders" value="1.2K" />
            <StatBox label="Revenue" value="₹45K" />
            <StatBox label="Products" value="32" />
          </View>
        </CustomCards>

        {/* ✏️ EDIT BUTTON */}
        <View style={styles.editBtnWrap}>
          <CustomButton
            title="Edit Shop Profile"
            onPress={() => {}}
            backgroundColor={Colors.primary}
            textColor="#fff"
          />
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

  // 🖼 BANNER
  bannerContainer: {
    position: 'relative',
  },

  banner: {
    width: '100%',
    height: moderateScale(160),
  },

  editBanner: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#00000088',
    padding: 6,
    borderRadius: 20,
  },

  // 🏪 PROFILE
  profileSection: {
    alignItems: 'center',
    marginTop: -40,
    paddingHorizontal: 16,
  },

  logoWrapper: {
    position: 'relative',
  },

  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },

  editLogo: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#00000088',
    padding: 4,
    borderRadius: 20,
  },

  shopName: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
  },

  tagline: {
    color: '#6B7280',
    fontSize: 12,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },

  rating: {
    fontWeight: '600',
  },

  reviews: {
    fontSize: 11,
    color: '#6B7280',
  },

  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 12,
  },

  toggleLabel: {
    fontSize: 14,
  },

  // 📦 CARDS
  card: {
    margin: 16,
    marginBottom: 10,
    padding: 14,
  },

  sectionTitle: {
    fontWeight: '700',
    marginBottom: 10,
  },

  infoRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },

  infoText: {
    color: '#374151',
  },

  // 📊 STATS
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statBox: {
    alignItems: 'center',
    flex: 1,
  },

  statValue: {
    fontWeight: '700',
    fontSize: 16,
    color: '#F97316',
  },

  statLabel: {
    fontSize: 11,
    color: '#6B7280',
  },

  // ✏️ BUTTON
  editBtnWrap: {
    margin: 16,
  },
});
export default ShopProfile;