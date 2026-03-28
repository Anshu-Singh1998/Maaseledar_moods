import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

// Theme
import Colors from '../../../../../Constants/Colors';
import Fonts from '../../../../Theme/Fonts';

// Components
import CustomCards from '../../../../Components/Card/CustomCards';

// ─── Dummy Data
const STATS = [
  { id: '1', title: 'Total Revenue', value: '₹24,500', icon: 'wallet-outline' },
  { id: '2', title: 'Orders', value: '320', icon: 'receipt-outline' },
  { id: '3', title: 'Customers', value: '180', icon: 'people-outline' },
];

const TOP_PRODUCTS = [
  { id: '1', name: 'Aloo Bhujia', sold: '120 sold' },
  { id: '2', name: 'Ratlami Sev', sold: '95 sold' },
  { id: '3', name: 'Masala Peanuts', sold: '80 sold' },
];

const ORDER_STATS = [
  { id: '1', label: 'Delivered', value: '220', color: '#10B981' },
  { id: '2', label: 'Pending', value: '60', color: '#F59E0B' },
  { id: '3', label: 'Cancelled', value: '40', color: '#EF4444' },
];

// ─── Components

const StatCard = ({ item }) => (
  <CustomCards style={styles.statCard}>
    <Icon name={item.icon} size={moderateScale(20)} color={Colors.primary} />
    <Text style={styles.statValue}>{item.value}</Text>
    <Text style={styles.statTitle}>{item.title}</Text>
  </CustomCards>
);

const ProductItem = ({ item }) => (
  <View style={styles.productItem}>
    <Text style={styles.productName}>{item.name}</Text>
    <Text style={styles.productSold}>{item.sold}</Text>
  </View>
);

const OrderStat = ({ item }) => (
  <View style={styles.orderStat}>
    <View style={[styles.dot, { backgroundColor: item.color }]} />
    <Text style={styles.orderLabel}>{item.label}</Text>
    <Text style={styles.orderValue}>{item.value}</Text>
  </View>
);

// ─── MAIN SCREEN

const AnalyticsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Analytics</Text>
        <Text style={styles.subtitle}>Track your business performance</Text>
      </View>

      {/* Stats */}
      <FlatList
        data={STATS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.statsContainer}
        renderItem={({ item }) => <StatCard item={item} />}
      />

      {/* Chart Placeholder */}
      <CustomCards style={styles.chartCard}>
        <Text style={styles.chartTitle}>Sales Overview</Text>

        {/* Placeholder (replace with chart lib later) */}
        <View style={styles.chartPlaceholder}>
          <Icon name="analytics-outline" size={moderateScale(40)} color={Colors.gray} />
          <Text style={styles.chartText}>Chart Coming Soon</Text>
        </View>
      </CustomCards>

      {/* Order Stats */}
      <CustomCards style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Order Insights</Text>

        {ORDER_STATS.map((item) => (
          <OrderStat key={item.id} item={item} />
        ))}
      </CustomCards>

      {/* Top Products */}
      <CustomCards style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Top Products</Text>

        <FlatList
          data={TOP_PRODUCTS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductItem item={item} />}
        />
      </CustomCards>

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
    marginBottom: verticalScale(16),
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
    marginBottom: verticalScale(16),
  },

  statCard: {
    width: moderateScale(140),
    padding: moderateScale(14),
    borderRadius: moderateScale(14),
  },

  statValue: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.family.bold,
    marginTop: verticalScale(6),
  },

  statTitle: {
    fontSize: moderateScale(12),
    color: Colors.gray,
  },

  // Chart
  chartCard: {
    padding: moderateScale(16),
    borderRadius: moderateScale(16),
    marginBottom: verticalScale(16),
  },

  chartTitle: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.family.semiBold,
    marginBottom: verticalScale(10),
  },

  chartPlaceholder: {
    height: verticalScale(140),
    justifyContent: 'center',
    alignItems: 'center',
  },

  chartText: {
    marginTop: verticalScale(8),
    color: Colors.gray,
  },

  // Sections
  sectionCard: {
    padding: moderateScale(16),
    borderRadius: moderateScale(16),
    marginBottom: verticalScale(16),
  },

  sectionTitle: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.family.semiBold,
    marginBottom: verticalScale(10),
  },

  // Order Stats
  orderStat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(8),
  },

  dot: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    marginRight: moderateScale(6),
  },

  orderLabel: {
    flex: 1,
    marginLeft: moderateScale(6),
    color: Colors.dark,
  },

  orderValue: {
    fontFamily: Fonts.family.bold,
  },

  // Products
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(8),
  },

  productName: {
    color: Colors.dark,
  },

  productSold: {
    color: Colors.gray,
  },
});
export default AnalyticsScreen;