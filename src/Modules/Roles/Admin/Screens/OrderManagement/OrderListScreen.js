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

import CustomCards from '../../../../Components/Card/CustomCards';
import Colors from '../../../../../Constants/Colors';

// ─── FILTERS
const FILTERS = ['All', 'Pending', 'Delivered', 'Cancelled'];

// ─── MOCK DATA
const ORDERS = [
  {
    id: '1',
    orderId: '#1023',
    customer: 'Rahul Sharma',
    amount: '₹320',
    status: 'Delivered',
    time: '10:30 AM',
  },
  {
    id: '2',
    orderId: '#1022',
    customer: 'Amit Singh',
    amount: '₹210',
    status: 'Pending',
    time: '09:15 AM',
  },
  {
    id: '3',
    orderId: '#1021',
    customer: 'Sneha Verma',
    amount: '₹450',
    status: 'Cancelled',
    time: 'Yesterday',
  },
];

// ─── MAIN
const AdminOrdersListScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredOrders = ORDERS.filter(order => {
    const matchesFilter =
      selectedFilter === 'All' || order.status === selectedFilter;

    const matchesSearch =
      order.orderId.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });
  const OrderCard = ({ item, onPress }) => {
    return (
      <Pressable onPress={onPress}>
        <CustomCards style={styles.card}>
          {/* TOP */}
          <View style={styles.row}>
            <Text style={styles.orderId}>{item.orderId}</Text>
            <StatusBadge status={item.status} />
          </View>

          {/* DETAILS */}
          <Text style={styles.customer}>{item.customer}</Text>

          <View style={styles.row}>
            <Text style={styles.amount}>{item.amount}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </CustomCards>
      </Pressable>
    );
  };
  const StatusBadge = ({ status }) => {
    let bg = '#E5E7EB';
    let color = '#374151';

    if (status === 'Delivered') {
      bg = '#DCFCE7';
      color = 'green';
    }
    if (status === 'Pending') {
      bg = '#FEF3C7';
      color = '#F59E0B';
    }
    if (status === 'Cancelled') {
      bg = '#FEE2E2';
      color = 'red';
    }

    return (
      <View style={[styles.badge, { backgroundColor: bg }]}>
        <Text style={[styles.badgeText, { color }]}>{status}</Text>
      </View>
    );
  };
  const EmptyState = () => (
    <View style={styles.empty}>
      <Icon name="receipt-outline" size={40} color="#9CA3AF" />
      <Text style={styles.emptyText}>No orders found</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔥 HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Orders</Text>
      </View>

      {/* 🔍 SEARCH */}
      <View style={styles.searchBox}>
        <Icon name="search" size={16} color="#6B7280" />
        <TextInput
          placeholder="Search by order ID or customer"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* 🎯 FILTERS */}
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

      {/* 📋 LIST */}
      <FlatList
        data={filteredOrders}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<EmptyState />}
        renderItem={({ item }) => (
          <OrderCard
            item={item}
            onPress={() => navigation.navigate('OrderDetails', { order: item })}
          />
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  header: {
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
  },

  // SEARCH
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 10,
    gap: 6,
  },

  searchInput: {
    flex: 1,
  },

  // FILTER
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 10,
    gap: 8,
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
  },

  filterTextActive: {
    color: '#fff',
  },

  // CARD
  card: {
    marginBottom: 10,
    padding: 14,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  orderId: {
    fontWeight: '700',
  },

  customer: {
    marginVertical: 6,
    color: '#374151',
  },

  amount: {
    fontWeight: '700',
    color: '#F97316',
  },

  time: {
    fontSize: 12,
    color: '#6B7280',
  },

  // BADGE
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },

  badgeText: {
    fontSize: 10,
  },

  // EMPTY
  empty: {
    alignItems: 'center',
    marginTop: 80,
  },

  emptyText: {
    marginTop: 10,
    color: '#6B7280',
  },
});
export default AdminOrdersListScreen;
