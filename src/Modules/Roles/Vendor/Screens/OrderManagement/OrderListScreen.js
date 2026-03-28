import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../../../../Constants/Colors';
import Fonts from '../../../../Theme/Fonts';
import CustomCards from '../../../../Components/Card/CustomCards';

// ─── Tabs
const TABS = ['New', 'Preparing', 'Ready', 'Completed'];

// ─── Dummy Orders
const ORDERS = [
  {
    id: '1',
    customer: 'Rahul Sharma',
    items: 'Bikaneri Bhujia x2',
    amount: '₹120',
    status: 'New',
    time: '2:30 PM',
  },
  {
    id: '2',
    customer: 'Neha Gupta',
    items: 'Sev x1',
    amount: '₹80',
    status: 'Preparing',
    time: '1:15 PM',
  },
];

// ─── Helpers
const getStatusColor = status => {
  switch (status) {
    case 'New':
      return '#F97316';
    case 'Preparing':
      return '#3B82F6';
    case 'Ready':
      return '#10B981';
    case 'Completed':
      return '#6B7280';
    default:
      return '#6B7280';
  }
};

// ─── MAIN
const Orders = () => {
  const [selectedTab, setSelectedTab] = useState('New');
  const [search, setSearch] = useState('');

  const filteredOrders = ORDERS.filter(
    o =>
      o.status === selectedTab &&
      o.customer.toLowerCase().includes(search.toLowerCase()),
  );

  const OrderCard = ({ item }) => (
    <CustomCards style={styles.card}>
      {/* Header */}
      <View style={styles.rowBetween}>
        <Text style={styles.customer}>{item.customer}</Text>
        <View
          style={[
            styles.badge,
            { backgroundColor: getStatusColor(item.status) + '20' },
          ]}
        >
          <Text
            style={[styles.badgeText, { color: getStatusColor(item.status) }]}
          >
            {item.status}
          </Text>
        </View>
      </View>

      {/* Items */}
      <Text style={styles.items}>{item.items}</Text>

      {/* Bottom */}
      <View style={styles.rowBetween}>
        <View>
          <Text style={styles.amount}>{item.amount}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>

        <View style={styles.actions}>
          {item.status === 'New' && (
            <>
              <Pressable style={styles.rejectBtn}>
                <Text style={styles.rejectText}>Reject</Text>
              </Pressable>
              <Pressable style={styles.acceptBtn}>
                <Text style={styles.acceptText}>Accept</Text>
              </Pressable>
            </>
          )}

          {item.status === 'Preparing' && (
            <Pressable style={styles.readyBtn}>
              <Text style={styles.readyText}>Mark Ready</Text>
            </Pressable>
          )}
        </View>
      </View>
    </CustomCards>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔍 SEARCH */}
      <View style={styles.searchBox}>
        <Icon name="search" size={18} color="#6B7280" />
        <TextInput
          placeholder="Search orders..."
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* 📊 TABS */}
      <View style={styles.tabs}>
        {TABS.map(tab => (
          <Pressable
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* 📦 ORDER LIST */}
      <FlatList
        data={filteredOrders}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => <OrderCard item={item} />}
        ListEmptyComponent={<Text style={styles.empty}>No orders found</Text>}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    gap: 8,
  },

  input: {
    flex: 1,
  },

  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  tab: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },

  activeTab: {
    backgroundColor: '#F97316',
  },

  tabText: {
    fontSize: 12,
    color: '#374151',
  },

  activeTabText: {
    color: '#fff',
    fontWeight: '700',
  },

  card: {
    marginBottom: 12,
    padding: 14,
  },

  customer: {
    fontWeight: '700',
    fontSize: 14,
  },

  items: {
    color: '#6B7280',
    marginVertical: 6,
  },

  amount: {
    fontWeight: '700',
    color: '#F97316',
  },

  time: {
    fontSize: 11,
    color: '#6B7280',
  },

  badge: {
    paddingHorizontal: 8,
    borderRadius: 10,
  },

  badgeText: {
    fontSize: 11,
  },

  actions: {
    flexDirection: 'row',
    gap: 6,
  },

  acceptBtn: {
    backgroundColor: '#16A34A',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },

  rejectBtn: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },

  readyBtn: {
    backgroundColor: '#F97316',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },

  acceptText: {
    color: '#fff',
    fontSize: 12,
  },

  rejectText: {
    color: '#DC2626',
    fontSize: 12,
  },

  readyText: {
    color: '#fff',
    fontSize: 12,
  },

  empty: {
    textAlign: 'center',
    marginTop: 50,
    color: '#9CA3AF',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default Orders;
