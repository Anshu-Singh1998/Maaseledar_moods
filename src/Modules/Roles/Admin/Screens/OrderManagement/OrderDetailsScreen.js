import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomCards from '../../../../Components/Card/CustomCards';
import CustomButton from '../../../../Components/Buttons/CustomButton';

// ─── MOCK ORDER DATA
const MOCK_ORDER = {
  orderId: '#1023',
  status: 'Pending',
  time: 'Today, 10:30 AM',

  customer: {
    name: 'Rahul Sharma',
    phone: '+91 9876543210',
  },

  vendor: {
    name: 'Bikaner Namkeen Store',
  },

  address: '221B Baker Street, New Delhi, India',

  items: [
    { id: '1', name: 'Bikaneri Bhujia', qty: 2, price: 120 },
    { id: '2', name: 'Masala Peanuts', qty: 1, price: 80 },
  ],

  subtotal: 320,
  delivery: 40,
  total: 360,
};

// ─── MAIN
const AdminOrderDetailsScreen = () => {
  const [status, setStatus] = useState(MOCK_ORDER.status);

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
    if (status === 'Accepted') {
      bg = '#DBEAFE';
      color = '#3B82F6';
    }

    return (
      <View style={[styles.badge, { backgroundColor: bg }]}>
        <Text style={[styles.badgeText, { color }]}>{status}</Text>
      </View>
    );
  };
  const BillRow = ({ label, value, bold }) => (
    <View style={styles.row}>
      <Text style={[styles.subText, bold && styles.bold]}>{label}</Text>
      <Text style={[styles.subText, bold && styles.bold]}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* 🧾 ORDER HEADER */}
        <CustomCards style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.orderId}>{MOCK_ORDER.orderId}</Text>
            <StatusBadge status={status} />
          </View>
          <Text style={styles.time}>{MOCK_ORDER.time}</Text>
        </CustomCards>

        {/* 👤 CUSTOMER */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Customer</Text>
          <Text style={styles.text}>{MOCK_ORDER.customer.name}</Text>
          <Text style={styles.subText}>{MOCK_ORDER.customer.phone}</Text>
        </CustomCards>

        {/* 🏪 VENDOR */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Vendor</Text>
          <Text style={styles.text}>{MOCK_ORDER.vendor.name}</Text>
        </CustomCards>

        {/* 📦 ITEMS */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Items</Text>

          {MOCK_ORDER.items.map(item => (
            <View key={item.id} style={styles.itemRow}>
              <View>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.subText}>Qty: {item.qty}</Text>
              </View>
              <Text style={styles.text}>₹{item.price * item.qty}</Text>
            </View>
          ))}
        </CustomCards>

        {/* 💰 BILL */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Bill Details</Text>

          <BillRow label="Subtotal" value={`₹${MOCK_ORDER.subtotal}`} />
          <BillRow label="Delivery" value={`₹${MOCK_ORDER.delivery}`} />

          <View style={styles.divider} />

          <BillRow label="Total" value={`₹${MOCK_ORDER.total}`} bold />
        </CustomCards>

        {/* 📍 ADDRESS */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <Text style={styles.text}>{MOCK_ORDER.address}</Text>
        </CustomCards>

        {/* ⚙️ ACTIONS */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Update Status</Text>

          <View style={styles.actionsRow}>
            <CustomButton
              title="Accept"
              backgroundColor="#22C55E"
              onPress={() => setStatus('Accepted')}
              style={styles.actionBtn}
            />

            <CustomButton
              title="Reject"
              backgroundColor="#EF4444"
              onPress={() => setStatus('Cancelled')}
              style={styles.actionBtn}
            />

            <CustomButton
              title="Delivered"
              backgroundColor="#3B82F6"
              onPress={() => setStatus('Delivered')}
              style={styles.actionBtn}
            />
          </View>
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

  card: {
    marginBottom: 12,
    padding: 14,
  },

  sectionTitle: {
    fontWeight: '700',
    marginBottom: 8,
  },

  text: {
    fontSize: 14,
    fontWeight: '600',
  },

  subText: {
    fontSize: 12,
    color: '#6B7280',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  orderId: {
    fontWeight: '700',
  },

  time: {
    marginTop: 4,
    fontSize: 12,
    color: '#6B7280',
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },

  badgeText: {
    fontSize: 10,
  },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  actionBtn: {
    flex: 1,
    marginHorizontal: 4,
  },

  bold: {
    fontWeight: '700',
    color: '#000',
  },
});
export default AdminOrderDetailsScreen;
