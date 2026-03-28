import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

// 🔹 Theme
import Colors from '../../../../../Constants/Colors';
import Fonts from '../../../../Theme/Fonts';

// 🔹 Reusable
import CustomCards from '../../../../Components/Card/CustomCards';

// ─── Dummy Data (replace with API later)
const STATS = [
  { id: '1', title: 'Users', value: '1,240', icon: 'people-outline' },
  { id: '2', title: 'Vendors', value: '86', icon: 'storefront-outline' },
  { id: '3', title: 'Orders', value: '3,210', icon: 'receipt-outline' },
  { id: '4', title: 'Revenue', value: '₹1.2L', icon: 'wallet-outline' },
];

const ORDERS = [
  { id: '1', name: 'Order #1234', status: 'Delivered' },
  { id: '2', name: 'Order #1235', status: 'Pending' },
  { id: '3', name: 'Order #1236', status: 'Cancelled' },
];

// ─── Components

// ─── Main Screen

const AdminDashboard = () => {
  const StatCard = ({ item }) => {
    return (
      <CustomCards style={styles.statCard}>
        <View style={styles.statRow}>
          <Icon
            name={item.icon}
            size={moderateScale(20)}
            color={Colors.primary}
          />
          <Text style={styles.statValue}>{item.value}</Text>
        </View>
        <Text style={styles.statTitle}>{item.title}</Text>
      </CustomCards>
    );
  };

  const OrderItem = ({ item }) => {
    return (
      <CustomCards style={styles.orderCard}>
        <Text style={styles.orderName}>{item.name}</Text>
        <Text style={styles.orderStatus}>{item.status}</Text>
      </CustomCards>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <Text style={styles.subtitle}>Overview of your platform</Text>
      </View>

      {/* Stats */}
      <FlatList
        data={STATS}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <StatCard item={item} />}
        contentContainerStyle={styles.statsContainer}
      />

      {/* Recent Orders */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Orders</Text>

        <FlatList
          data={ORDERS}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <OrderItem item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: moderateScale(16),
  },

  header: {
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
  },

  title: {
    fontSize: moderateScale(22),
    fontFamily: Fonts.family.bold,
    color: Colors.dark,
  },

  subtitle: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.family.regular,
    color: Colors.gray,
    marginTop: verticalScale(4),
  },

  // Stats
  statsContainer: {
    gap: moderateScale(12),
  },

  statCard: {
    flex: 1,
    margin: moderateScale(6),
    padding: moderateScale(14),
    borderRadius: moderateScale(14),
  },

  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  statValue: {
    fontSize: moderateScale(18),
    fontFamily: Fonts.family.bold,
    color: Colors.dark,
  },

  statTitle: {
    marginTop: verticalScale(6),
    fontSize: moderateScale(12),
    color: Colors.gray,
    fontFamily: Fonts.family.medium,
  },

  // Orders
  section: {
    marginTop: verticalScale(20),
  },

  sectionTitle: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.family.semiBold,
    color: Colors.dark,
    marginBottom: verticalScale(10),
  },

  orderCard: {
    padding: moderateScale(12),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  orderName: {
    fontFamily: Fonts.family.medium,
    color: Colors.dark,
  },

  orderStatus: {
    fontFamily: Fonts.family.medium,
    color: Colors.primary,
  },
});
export default AdminDashboard;
