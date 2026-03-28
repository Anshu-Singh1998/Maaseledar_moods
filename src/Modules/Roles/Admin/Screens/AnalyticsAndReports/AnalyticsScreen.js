import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomCards from '../../../../Components/Card/CustomCards';
import Colors from '../../../../../Constants/Colors';

// ─── FILTER OPTIONS
const FILTERS = ['Today', 'Week', 'Month'];

// ─── MAIN
const AdminAnalyticsScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('Today');
  const Stat = ({ label, value, icon }) => (
    <View style={styles.statBox}>
      <View style={styles.iconWrap}>
        <Icon name={icon} size={16} color="#F97316" />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const TopProduct = ({ name, orders }) => (
    <View style={styles.productRow}>
      <View style={styles.productLeft}>
        <Icon name="fast-food-outline" size={16} color="#374151" />
        <Text style={styles.productName}>{name}</Text>
      </View>
      <Text style={styles.productOrders}>{orders}</Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🔥 HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Analytics</Text>

          <View style={styles.filterRow}>
            {FILTERS.map(item => (
              <Pressable
                key={item}
                onPress={() => setSelectedFilter(item)}
                style={[
                  styles.filterBtn,
                  selectedFilter === item && styles.filterActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === item && styles.filterTextActive,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* 💰 REVENUE */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Revenue</Text>

          <View style={styles.row}>
            <Stat label="Total Revenue" value="₹1,25,000" icon="cash-outline" />
            <Stat label="Orders" value="2,430" icon="bag-outline" />
          </View>

          {/* Chart Placeholder */}
          <View style={styles.chartBox}>
            <Text style={styles.chartText}>Revenue Graph</Text>
          </View>
        </CustomCards>

        {/* 📦 ORDERS */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Orders Overview</Text>

          <View style={styles.row}>
            <Stat
              label="Delivered"
              value="2,100"
              icon="checkmark-circle-outline"
            />
            <Stat label="Cancelled" value="120" icon="close-circle-outline" />
            <Stat label="Pending" value="210" icon="time-outline" />
          </View>
        </CustomCards>

        {/* 👥 USERS */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Users</Text>

          <View style={styles.row}>
            <Stat label="New Users" value="320" icon="person-add-outline" />
            <Stat label="Active Users" value="1,890" icon="people-outline" />
          </View>
        </CustomCards>

        {/* 🏪 VENDORS */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Vendors</Text>

          <View style={styles.row}>
            <Stat label="Total Vendors" value="45" icon="storefront-outline" />
            <Stat
              label="Active Vendors"
              value="38"
              icon="checkmark-done-outline"
            />
          </View>
        </CustomCards>

        {/* 🔥 TOP PRODUCTS */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Top Products</Text>

          <TopProduct name="Bikaneri Bhujia" orders="540 orders" />
          <TopProduct name="Masala Peanuts" orders="420 orders" />
          <TopProduct name="Ratlami Sev" orders="390 orders" />
        </CustomCards>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  // HEADER
  header: {
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },

  filterRow: {
    flexDirection: 'row',
    gap: 10,
  },

  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },

  filterActive: {
    backgroundColor: '#F97316',
  },

  filterText: {
    fontSize: 12,
    color: '#374151',
  },

  filterTextActive: {
    color: '#fff',
  },

  // CARD
  card: {
    margin: 16,
    marginTop: 0,
    padding: 14,
  },

  sectionTitle: {
    fontWeight: '700',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statBox: {
    alignItems: 'center',
    flex: 1,
  },

  iconWrap: {
    backgroundColor: '#FFF7ED',
    padding: 8,
    borderRadius: 20,
    marginBottom: 6,
  },

  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F97316',
  },

  statLabel: {
    fontSize: 11,
    color: '#6B7280',
  },

  // CHART
  chartBox: {
    height: 120,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  chartText: {
    color: '#6B7280',
  },

  // PRODUCTS
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },

  productLeft: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },

  productName: {
    fontSize: 13,
    color: '#374151',
  },

  productOrders: {
    fontSize: 12,
    color: '#6B7280',
  },
});
export default AdminAnalyticsScreen;
